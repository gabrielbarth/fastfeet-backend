import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';

class FinalizeDeliveryController {
  async update(req, res) {
    const { deliveryman_id, delivery_id } = req.params;

    // checking if a file was sent before (signature)
    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'You must send a signature picture' });
    }

    const { filename: path, originalname: name } = req.file;

    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    // checking if deliveryman exists
    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman ID does not exist.' });
    }

    const deliveryExists = await Delivery.findByPk(delivery_id, {
      include: {
        model: Deliveryman,
        as: 'deliveryman',
        attributes: ['id'],
      },
    });

    // same verifications that WithdrawalDelivery, least start_date in this case
    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery ID does not exist' });
    }
    if (deliveryExists.deliveryman.id !== Number(deliveryman_id)) {
      return res.status(400).json({
        error:
          'You cannot withdraw delivery that belongs to another delivery person',
      });
    }
    if (deliveryExists.canceled_at) {
      return res.status(400).json({
        error: 'This delivery has been canceled',
      });
    }
    if (deliveryExists.end_date) {
      return res.status(400).json({
        error: 'This delivery has already been delivered',
      });
    }

    // Adding the file to DB
    const file = await File.create({
      name,
      path,
    });

    const delivery = deliveryExists;

    const updatedDelivery = await delivery.update({
      end_date: new Date(),
      signature_id: file.id,
    });

    return res.json(updatedDelivery);
  }
}

export default new FinalizeDeliveryController();
