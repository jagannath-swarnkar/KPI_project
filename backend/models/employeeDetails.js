module.exports = knex => {
    // creating kpi table
    knex.schema.hasTable("employeeDetails").then( function(exists) {
      if (!exists) {
        return knex.schema.createTable("employeeDetails", function(table) {
          table
            .increments("id")
            .primary()
            .notNullable(),
            table.string("employee_name").notNullable();
            table.string("email").notNullable().unique();
            table.string("password").notNullable();
            table.string("employee_unique_id").notNullable();
        });
      }
    });
  };
