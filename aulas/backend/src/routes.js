const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({

    [Segments.BODY]: Joi.object().keys({

        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.post('/incidents', IncidentController.create); //rota pra cadastrar

routes.get('/incidents', celebrate({

[Segments.QUERY]: Joi.object().keys({

    page: Joi.number(),
})

}), IncidentController.index); //rota pra listar


routes.delete('/incidents/:id', celebrate({
[Segments.PARAMS]: Joi.object().keys({

    id: Joi.number().required(),
})

}),IncidentController.delete); //rota pra deletar


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({ 
//unknown descar as informações desconhecidas que tbm são enviadas e então não valida
        authorization: Joi.string().required() }).unknown(), 



}), ProfileController.index);

//criando a sessão (login)
routes.post('/sessions', SessionController.create);






module.exports = routes;