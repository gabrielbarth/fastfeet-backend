import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class PendingDeliveriesController {
  /**
   * Listing deliveryman pending deliveries through you ID
   * Deliveries not finished and not canceled
   */
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
        end_date: null,
        canceled_at: null,
      },
    });

    return res.json(deliveries);
  }
}

export default new PendingDeliveriesController();
