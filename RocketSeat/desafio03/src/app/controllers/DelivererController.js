import * as Yup from 'yup';
import Deliverer from '../models/Deliverer';

class DelivererController {
  async index(req, res) {
    const deliverers = await Deliverer.findAll();

    return res.json(deliverers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (! (await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    }

    const { email, nome } = req.body;

    const nameExists = await Deliverer.findOne({ where: { nome }});

    if(nameExists) {
      return res.status(400).json({ error: 'Deliverer with this name alredy exists'});
    }

    const emailExists = await Deliverer.findOne({ where: { email } });

    if(emailExists) {
      return res.status(400).json({ error: 'Deliverer with this email alredy exists'});
    }

    const { id } = await Deliverer.create(req.body);

    return res.json({
      id,
      nome,
      email
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string(),
      nome: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'} );
    }


    const deliverer = await Deliverer.findByPk(req.params.id);

    if (!deliverer) {
      return res.status(404).json({ error: 'Deliverer not found'} );
    }

    const { email, nome } = req.body;

    if (email && email !== deliverer.email | nome && nome !== deliverer.nome) {

      const emailExists = await Deliverer.findOne( { where: { email }} );
      if(emailExists) {
        return res.status(400).json({ error: 'Deliverer with this email alredy exists'} );
      }

      const nameExists = await Deliverer.findOne( { where: { nome }} );
      if(nameExists) {
        return res.status(400).json({ error: 'Deliverer with this name alredy exists'} );
      }
    }

    await deliverer.update(req.body);

    return res.json({ nome, email });
  }
}

export default new DelivererController();
