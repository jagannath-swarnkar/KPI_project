module.exports = (knex) => {
  // creating employee table
  knex.schema.hasTable("employee").then(function(exists) {
    if (!exists) {
      return knex.schema.createTable("employee", function(table) {
        table
          .increments("employee_id")
          .primary()
          .notNullable(),
          table.string("employee_name").notNullable(),
          table.string("employee_unique_id");
      });
    }
  });
};
