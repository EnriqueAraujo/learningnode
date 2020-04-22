import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number().required(),
      complemento: Yup.string(),
      estado: Yup.string().required().min(2).max(2),
      cidade: Yup.string().required(),
      cep: Yup.string().required(),
    })

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Validation Fails'});
    }

    const { rua, numero } = req.body;

    const recipient = await Recipient.findOne({ where: { rua, numero }});

    if(recipient) {
      return res.status(401).json({ error: 'Recipient alredy exists with this data'})
    }

    const { id, nome, complemento, estado, cidade, cep } = await Recipient.create(req.body);

    return res.json({
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number().when('rua', (rua, field) =>
        rua ? field.required() : field),
      complemento: Yup.string(),
      estado: Yup.string().min(2).max(2),
      cidade: Yup.string(),
      cep: Yup.string().when('numero', (numero, field) =>
        numero ? field.required() : field
      ),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { rua, numero } = req.body;

    if(rua | numero){
      const recipientExists = await Recipient.findOne({ where: { rua, numero }});

      if (recipientExists) {
        return res.status(400).json({ error: 'Recipient alredy exists with this data'})
      }
    }

    const recipient = await Recipient.findByPk(req.params.id);

    const { id, nome, complemento, estado, cidade, cep } = await recipient.update(req.body);

    return res.json({
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    })

  }
}

export default new RecipientController();
