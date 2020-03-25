const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create); //rota pra cadastrar
routes.get('/incidents', IncidentController.index); //rota pra listar
routes.delete('/incidents/:id', IncidentController.delete); //rota pra deletar


routes.get('/profile', ProfileController.index);

//criando a sessão (login)
routes.post('/sessions', SessionController.create);






module.exports = routes;