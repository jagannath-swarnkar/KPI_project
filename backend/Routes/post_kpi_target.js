module.exports = (kpi_target, knex, jwt) => {
  kpi_target.post("/post_kpi_target", (req, res) => {
    jwt.verify(req.body.data.token, "mySecurity$key", (err, tokenData) => {
      if (!err) {
        knex("employee_kpi_target")
          .insert({
            kpi_id: req.body.data.kpi_id,
            employee_id: tokenData.employee_unique_id,
            percentage: req.body.data.percentage,
            target: req.body.data.target
          })
          .then(inserted_data => {
            knex("employee_kpi_target")
              .where(
                "employee_kpi_target.employee_id",
                tokenData.employee_unique_id
              )
              .join("kpi", "employee_kpi_target.kpi_id", "=", "kpi.kpi_id")
              .then(new_data => {
                console.log(new_data);
                res.json(new_data);
              })
              .catch(err =>
                console.log("error in inserting data into db", err)
              );
          })
          .catch(err => console.log("error in inserting data into db", err));
      }
    });
  });

  kpi_target.get("/get_kpi_target", (req, res) => {
    jwt.verify(req.query.token, "mySecurity$key", (err, tokenData) => {
      if (!err) {
        knex("employee_kpi_target")
          .where(
            "employee_kpi_target.employee_id",
            tokenData.employee_unique_id
          )
          .join("kpi", "employee_kpi_target.kpi_id", "=", "kpi.kpi_id")
          .then(new_data => {
            console.log(new_data);
            res.json(new_data);
          })
          .catch(err => console.log("error in inserting data into db", err));
      }
    });
  });
};
