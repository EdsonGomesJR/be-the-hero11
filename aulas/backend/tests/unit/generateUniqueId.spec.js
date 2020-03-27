const  generateUniqueId  = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () =>{
        //it = isto // qual resultado esperar dessa função de teste
    it('should generate an unique ID', () => {

        const id = generateUniqueId();

        expect(id).toHaveLength(8); //espera que o id tenha 8 caracteres

    }); 

});