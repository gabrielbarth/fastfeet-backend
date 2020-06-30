import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  // listing all recipients of filtering by name and creating pagination
  async index(req, res) {
    const { q: recipientName, page = 1 } = req.query;
    const recipients = recipientName
      ? await Recipient.findAll({
          where: {
            name: {
              [Op.iLike]: `${recipientName}`,
            },
          },
          attributes: ['id', 'name', 'street', 'number', 'state', 'city'],
          limit: 5,
          offset: (page - 1) * 5,
        })
      : await Recipient.findAll({
          attributes: ['id', 'name', 'street', 'number', 'state', 'city'],
          limit: 5,
          offset: (page - 1) * 5,
        });

    return res.json(recipients);
  }

  // creating a recipient
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      complement: Yup.string(),
      number: Yup.string().required(),
      zip_code: Yup.string().required(),
      state: Yup.string()
        .required()
        .max(2),
      city: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      name,
      street,
      compement,
      number,
      zip_code,
      state,
      city,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      compement,
      number,
      zip_code,
      state,
      city,
    });
  }

  // filtering a recipient
  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id, {
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zip_code',
      ],
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    return res.json(recipient);
  }

  // updating a recipient
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      zip_code: Yup.string(),
      street: Yup.string().when('zip_code', (zip_code, field) =>
        zip_code ? field.required() : field
      ),
      complement: Yup.string(),
      number: Yup.string(),
      state: Yup.string().max(2),
      city: Yup.string().when('state', (state, field) =>
        state ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      name,
      street,
      compement,
      number,
      zip_code,
      state,
      city,
    } = await Recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      compement,
      number,
      zip_code,
      state,
      city,
    });
  }
}

export default new RecipientController();
