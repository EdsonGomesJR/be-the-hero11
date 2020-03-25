const express = require('express'); //contem todas as funcionalidades do express disponiveis
const cors = require('cors');
const routes  = require('./routes');

const app = express();

app.use(cors());

app.use(express.json()); //diz pro express converter o json para object que vira da requisição

app.use(routes);


app.listen(3333); //listener pra porta 3333, não fica observando e atualizando

