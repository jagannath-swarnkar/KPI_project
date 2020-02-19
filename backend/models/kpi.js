module.exports = knex => {
  // creating kpi table
  knex.schema.hasTable("kpi").then( function(exists) {
    if (!exists) {
      return knex.schema.createTable("kpi", function(table) {
        table
          .increments("kpi_id")
          .primary()
          .notNullable(),
          table.string("kpi_name").notNullable();
      });
    }
  });
};
