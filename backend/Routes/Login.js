module.exports = (login, knex, jwt) => {
  login.post("/login", (req, res) => {
    console.log("login", req.body.email);
    knex("employeeDetails")
      .where("employeeDetails.email", req.body.email)
      .andWhere("employeeDetails.password", req.body.pass)
      .then(data => {
        if (data.length > 0) {
          console.log("signin successfull", data[0]);
          jwt.sign(
            {
              email: data[0].email,
              employee_unique_id: data[0].employee_unique_id,
              employee_name: data[0].employee_name
            },
            "mySecurity$key",
            { expiresIn: "1d" },
            (err, token) => {
              if (!err) {
                res.json(token);
              }
            }
          );
        } else {
          console.log("user doesn't exist");
          res.json("invalid");
        }
      })
      .catch(err => console.error(err));
  });
};
