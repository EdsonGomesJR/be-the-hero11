
exports.up = function(knex) { //metodo pra criar a tabela

  return  knex.schema.createTable('ongs',function(table){

        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // 2 ali é o numero de caracteres
       




    });
  
};

exports.down = function(knex) { // se der problemas

   return knex.schema.dropTable('ongs');
  
};
