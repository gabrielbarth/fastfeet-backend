import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class CompletedDeliveriesController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(id);

    // Checking if deliveryman exists
    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman ID does not exist.' });
    }

    // Listing open deliveries/ Search query
    const deliveries = await Delivery.findAll({
      limit: 5,
      offset: (page - 1) * 5,
      order: [['id', 'ASC']],
      where: {
        deliveryman_id: id,
        signature_id: { [Op.not]: null },
      },
      attributes: [
        'id',
        'deliveryman_id',
        'product',
        'status',
        'start_date',
        'end_date',
        'canceled_at',
        'createdAt',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'state',
            'city',
            'street',
            'number',
            'complement',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(deliveries);
  }
}

export default new CompletedDeliveriesController();
