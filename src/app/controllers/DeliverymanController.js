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
          limit: 5,
          offset: (page - 1) * 5,
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
          limit: 5,
          offset: (page - 1) * 5,
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
      avatar_id: Yup.string().notRequired(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { name, email, avatar_id } = req.body;

    // Check if delivery man already exists in database
    const deliverymanExists = await Deliveryman.findOne({
      where: { email },
    });

    if (deliverymanExists) {
      return res.status(401).json({ error: 'Deliveryman already exists' });
    }

    const deliveryman = await Deliveryman.create({ name, email, avatar_id });
    return res.json(deliveryman);
  }

  // updating deliveryman
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number().notRequired(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { name, email, avatar_id } = req.body;

    /*
     * Check if avatar_id exists in database
     */
    if (avatar_id) {
      const avatarExists = await File.findByPk(avatar_id);

      if (!avatarExists) {
        return res.status(400).json({ error: 'File does not exists' });
      }
    }

    /*
     * Check if delivery man exists in database
     */
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    /*
     * Check if exists an other delivery man with the same email
     */
    if (email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    await deliveryman.update({ name, email, avatar_id });

    const { avatar } = await Deliveryman.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ id, name, email, avatar });
  }

  // filtering a deliveryman
  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    return res.json(deliveryman);
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
