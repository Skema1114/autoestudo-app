
exports.up = function(knex) {
    //aqui é quando executa a criação da tabela
    return knex.schema.createTable('usuario', function (table) {
        table.string('id').primary();
        
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('senha').notNullable();
    });
};

exports.down = function(knex) {
  //aqui é caso der errado, o que ele faz, aqui ele dropa a tabela
  return knex.schema.dropTable('usuario');
};
