
exports.up = function(knex) {
  return knex.schema.createTable('mes', function (table) {
      table.increments();
      
      table.string('id_usuario').notNullable();
      table.foreign('id_usuario').references('id').inTable('usuario');

      table.integer('mes').notNullable();
      table.integer('ano').notNullable();
      table.integer('qtd_nao').notNullable();
      table.string('data_cadastro').notNullable();

      table.integer('bloq');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('mes');
};
