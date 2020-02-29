module.exports = (emp, knex, jwt) => {
  emp.get("/getEmployeeDetails", (req, res) => {
    var totalData = {};
    jwt.verify(req.query.token, "mySecurity$key", (err, tokenData) => {
      if (!err) {
        const data = async () => {
          totalData["employee_details"] = tokenData;
          await knex("employee_kpi_target")
            .then(emp_data => {
              totalData["employee_kpi_target"] = emp_data;
            })
            .catch(err => console.log("err in getting emp details", err));
          await knex("kpi")
            .then(kpi_data => {
              totalData["kpi"] = kpi_data;
            })
            .catch(err => console.log("err in getting emp details", err));
          await res.json(totalData);
        };
        data();
      }
    });
  });
};
