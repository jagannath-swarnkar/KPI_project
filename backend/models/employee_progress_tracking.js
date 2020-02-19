module.exports = (knex) => {
  // creating employee_progress_tracking table
  knex.schema.hasTable("employee_progress_tracking").then(function(exists) {
    if (!exists) {
      return knex.schema.createTable("employee_progress_tracking", function(
        table
      ) {
        table
          .increments("employee_progress_tracking_id")
          .primary()
          .notNullable(),
          table.integer("kpi_name").notNullable(),
          table.integer("employee_id").notNullable(),
          table.string("actual").notNullable(),
          table.integer("target").notNullable(),
          table.integer("week_ending_id"),
          table.integer("appraisal_cycle_id");
      });
    }
  });
};
