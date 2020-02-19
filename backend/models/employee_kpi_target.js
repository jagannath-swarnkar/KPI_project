module.exports = knex => {
  // creating employee_kpi_target table
  knex.schema.hasTable("employee_kpi_target").then(function(exists) {
    if (!exists) {
      return knex.schema.createTable("employee_kpi_target", function(table) {
        table
          .increments("employee_kpi_target_id")
          .primary()
          .notNullable(),
          table.integer("kpi_id").notNullable(),
          table.integer("employee_id").notNullable(),
          table.integer("percentage").notNullable(),
          table.integer("target").notNullable(),
          table.integer("appraisal_cycle_id");
      });
    }
  });
};
