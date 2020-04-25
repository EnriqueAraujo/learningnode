import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const deliverers = await Deliveryman.findAll({
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
    });

    return res.json(deliverers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, nome } = req.body;

    const nameExists = await Deliveryman.findOne({ where: { nome } });

    if (nameExists) {
      return res
        .status(400)
        .json({ error: 'Deliverer with this name alredy exists' });
    }

    const emailExists = await Deliveryman.findOne({ where: { email } });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: 'Deliverer with this email alredy exists' });
    }

    const { id } = await Deliveryman.create(req.body);

    return res.json({
      id,
      nome,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string(),
      nome: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverer = await Deliveryman.findByPk(req.params.id);

    if (!deliverer) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const { email, nome } = req.body;

    if (
      email &&
      (email !== Deliveryman.email) | nome &&
      nome !== Deliveryman.nome
    ) {
      const emailExists = await Deliveryman.findOne({ where: { email } });
      if (emailExists) {
        return res
          .status(400)
          .json({ error: 'Deliveryman with this email alredy exists' });
      }

      const nameExists = await Deliveryman.findOne({ where: { nome } });
      if (nameExists) {
        return res
          .status(400)
          .json({ error: 'Deliveryman with this name alredy exists' });
      }
    }

    const { id } = await deliverer.update(req.body);

    return res.json({ id, nome, email });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const deliverer = await Deliveryman.findByPk(id);

    if (!deliverer) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    await Deliveryman.destroy({ where: { id } });

    return res.json({ message: 'Deliveryman deleted' });
  }
}

export default new DeliverymanController();
