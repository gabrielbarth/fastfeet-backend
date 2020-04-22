import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  // listing all deliverymen or filtering by deliverymanName and creating pagination
  async index(req, res) {
    const { q: deliverymanName, page = 1 } = req.query;

    const deliverymen = deliverymanName
      ? await Deliveryman.findAll({
          where: {
            name: {
              [Op.iLike]: `${deliverymanName}`,
            },
          },
          attributes: ['id', 'name', 'email'],
          limit: 20,
          offset: (page - 1) * 20,
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'name', 'path'],
            },
          ],
        })
      : await Deliveryman.findAll({
          attributes: ['id', 'name', 'email'],
          limit: 20,
          offset: (page - 1) * 20,
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'name', 'path'],
            },
          ],
        });
    return res.json(deliverymen);
  }

  // creating a deliveryman
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { email } = req.body;

    const deliverymanExists = await Deliveryman.findOne({
      where: { email },
    });

    if (deliverymanExists) {
      return res.status(401).json({ error: 'Deliveryman already exists' });
    }

    const deliveryman = await Deliveryman.create(req.body);
    return res.json(deliveryman);
  }

  // updating info of a deliveryman
  async update(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);
    if (!deliveryman) {
      return res.status(400).json({ error: "deliveryman don't exist" });
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { id, email } = req.body;

    // verifying if email already exists (for another user)
    if (email && deliveryman.email !== email) {
      const deliverymanExist = await Deliveryman.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (deliverymanExist) {
        return res.status(400).json('Deliveryman already exist');
      }
    }

    // verifying if avatar exist
    const avatar = await File.findByPk(req.body.avatar_id);

    if (!avatar) {
      return res.status(400).json('Avatar does not exist');
    }

    if (!id)
      return res
        .status(400)
        .json({ error: 'An deliveryman id must be provided' });

    const deliverymanExists = await Deliveryman.findOne({
      where: { id },
    });
    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman is not exist' });
    }

    const newDeliveryman = await deliveryman.update(req.body);
    return res.json(newDeliveryman);
  }

  // deleting a deliveryman
  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman does not exists' });
    }
    // excluding delivaryman's avatar from database (if exists)
    if (deliveryman.avatar_id) {
      await File.destroy({
        where: {
          id: deliveryman.avatar_id,
        },
        individualHooks: true,
      });
    }

    await Deliveryman.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.send();
  }
}

export default new DeliverymanController();
