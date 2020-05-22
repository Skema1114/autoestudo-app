
exports.up = function(knex) {
  return knex.schema.createTable('dia', function (table) {
      table.increments();
      
      table.integer('id_usuario').notNullable();
      table.foreign('id_usuario').references('id').inTable('usuario');

      table.integer('id_mes').notNullable();
      table.foreign('id_mes').references('id').inTable('mes');

      table.integer('dia').notNullable();
      table.string('data_cadastro').notNullable();

      table.string('bloq');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('dia');
};
