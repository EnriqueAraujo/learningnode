import * as Yup from 'yup';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          attributes: ['id', 'nome', 'rua', 'numero', 'cep'],
        },
        {
          model: Deliveryman,
          attributes: ['id', 'nome'],
        },
      ],
    });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id, recipient_id } = req.body;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id, {
      attributes: ['id', 'nome'],
    });

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const recipient = await Recipient.findByPk(recipient_id, {
      attributes: ['id', 'nome', 'rua', 'numero', 'cep'],
    });

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const {
      id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = await Order.create(req.body);

    return res.json({
      id,
      product,
      deliveryman,
      recipient,
      canceled_at,
      start_date,
      end_date,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const recipient = await Recipient.findByPk(req.body.recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const { product, recipient_id, deliveryman_id } = await order.update(
      req.body
    );

    return res.json({ product, recipient_id, deliveryman_id });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await Order.destroy({ where: { id } });

    return res.json({ message: 'Order deleted' });
  }
}

export default new OrderController();
