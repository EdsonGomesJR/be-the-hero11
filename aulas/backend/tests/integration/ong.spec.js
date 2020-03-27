
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {
    //antes de cada test
    beforeEach(async () => {  //por poder demorar pra executar, utilizar async await

        await connection.migrate.rollback(); //antes de executar, desfazer as migrations
        await connection.migrate.latest(); //executa o comando npx migrate-latest


    });
    //para executar depois de todos os testes
    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {

        const response = await request(app)
            .post('/ongs')
            //.set('Authorization', 'id da ong')
            .send({

                name: "e",
                email: "contato@a.com.br",
                whatsapp: "12981356877",
                city: "Rul",
                uf: "SP"


            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
        const x = response.body;


    });



});