import * as Yup from 'yup';

import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    // listing all deliveries or filtering by productName
    const { q: productName, page = 1 } = req.query;

    const deliveries = productName
      ? await Delivery.findAll({
          where: {
            product: {
              [Op.iLike]: `${productName}`,
            },
          },
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['id', 'name', 'street', 'number', 'city', 'state'],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id', 'url', 'path'],
            },
          ],
          attributes: [
            'id',
            'product',
            'status',
            'start_date',
            'end_date',
            'canceled_at',
          ],
          limit: 5,
          offset: (page - 1) * 5,
        })
      : await Delivery.findAll({
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['id', 'name', 'street', 'number', 'city', 'state'],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id', 'url', 'path'],
            },
          ],
          attributes: [
            'id',
            'product',
            'status',
            'start_date',
            'end_date',
            'canceled_at',
          ],
          limit: 5,
          offset: (page - 1) * 5,
        });

    return res.json(deliveries);
  }

  // creating a delivery
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }
    const { recipient_id, deliveryman_id, product } = req.body;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id, {
      attributes: ['name', 'email'],
    });

    // verifying if deliveryman exists
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist.' });
    }

    const recipient = await Recipient.findByPk(recipient_id, {
      attributes: ['name'],
    });

    // verifying if recipient exists
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist.' });
    }

    // const hourStart = startOfHour(parseISO(start_date));

    // // verifying if hour is between 08 a.m. and 18 p.m.
    // if (hourStart.getHours() < 8 || hourStart.getHours() >= 18) {
    //   return res.status(400).json({
    //     error: 'Withdrawals can only be made between 08:00 a.m. and 18:00 p.m.',
    //   });
    // }

    const delivery = await Delivery.create({
      recipient_id,
      deliveryman_id,
      product,
      status: 'PENDING',
    });

    // sending email to deliveryman
    await delivery.save();

    // second parameter fo handler() function -> data
    await Queue.add(NewDeliveryMail.key, {
      deliveryman,
      product,
      recipient,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist ' });
    }

    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    // checking if deliveryman is being to update
    if (req.body.deliveryman_id) {
      const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id, {
        attributes: ['name', 'email'],
      });
      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman does not exist.' });
      }
    }

    // checking if recipient is being to update
    if (req.body.recipient_id) {
      const recipient = await Recipient.findByPk(req.body.recipient_id, {
        attributes: ['name'],
      });

      if (!recipient) {
        return res.status(400).json({ error: 'Recipient does not exist.' });
      }
    }

    const newDelivery = await delivery.update(req.body);

    return res.json(newDelivery);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    return res.json(delivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist ' });
    }

    // removing signature image from application store
    if (delivery.signature_id) {
      await File.destroy({
        where: {
          id: delivery.signature_id,
        },
      });
    }

    // removing signature image from database
    await Delivery.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send();
  }
}

export default new DeliveryController();
