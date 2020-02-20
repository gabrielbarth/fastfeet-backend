import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import Queue from '../../lib/Queue';
import CancelDeliveryMail from '../jobs/CancelDeliveryMail';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveries = await DeliveryProblem.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      order: [['id', 'ASC']],
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
        },
      ],
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { delivery_id } = req.params;

    const deliveryExists = await Delivery.findByPk(delivery_id);

    // checking id the delivery exists
    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery ID does not exist' });
    }

    const deliveryProblems = await DeliveryProblem.findAll({
      where: {
        delivery_id,
      },
    });

    // checking if there are problems
    if (deliveryProblems.length === 0) {
      return res
        .status(400)
        .json({ error: 'Delivery does not have any problem registered' });
    }

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'You must write the problem descrition' });
    }

    const { delivery_id } = req.params;
    const { description } = req.body;

    const deliveryExists = await Delivery.findByPk(delivery_id);

    // checking if the delivery exists
    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery ID does not exist' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const { problem_id } = req.params;
    const problem = await DeliveryProblem.findByPk(problem_id);

    // checking if the delivery problem exists
    if (!problem) {
      return res
        .status(400)
        .json({ error: 'Delivery Problem ID does not exist' });
    }

    const delivery = await Delivery.findByPk(problem.delivery_id);

    // checking if delivery is canceled
    if (delivery.canceled_at) {
      return res.status(400).json({
        error: 'Delivery has already been canceled',
      });
    }

    await delivery.update({
      canceled_at: new Date(),
    });

    delivery.save();

    const deliveryman = await Deliveryman.findByPk(delivery.deliveryman_id);
    const recipient = await Recipient.findByPk(delivery.recipient_id);

    // sending mail
    await Queue.add(CancelDeliveryMail.key, {
      deliveryman,
      recipient,
      delivery,
    });

    return res.send(delivery);
  }
}

export default new DeliveryProblemsController();
