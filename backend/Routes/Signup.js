var uniqid = require("uniqid");
module.exports = (route, knex) => {
  // adding employee to user table and employee table
  route.post("/signup", (req, res) => {
    knex("employeeDetails")
      .insert({
        employee_name: req.body.data.firstname + " " + req.body.data.lastname,
        email: req.body.data.email,
        password: req.body.data.pass,
        employee_unique_id: uniqid()
      })
      .then(data => {
        console.log("data added to employeeDetails table");
        knex("employeeDetails")
          .where("employeeDetails.email", req.body.data.email)
          .then(data1 => {
            knex("employee")
              .insert({
                employee_name: data1[0].employee_name,
                employee_unique_id: data1[0].employee_unique_id
              })
              .then(data2 => {
                console.log("data added to employee table", data2);
                res.json("data added to employee table");
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
        res.json("duplicate");
      });
  });
};
