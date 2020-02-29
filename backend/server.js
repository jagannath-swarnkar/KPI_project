var cors = require("cors");
var jwt = require('jsonwebtoken');
var express = require("express");
require("dotenv").config();
var app = express();
app.use(express.json());
app.use(cors());

// Creating connections for mysql server with knex query;
var knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
  },
  useNullAsDefault: true
});

// creating employee table
require("./models/employee")(knex);
// creating kpi table
require("./models/kpi")(knex);
// creating employee_kpi_target table
require("./models/employee_kpi_target")(knex);
// creating employee_progress_tracking table
require("./models/employee_progress_tracking")(knex);
// creating employee details table (signup)
require("./models/employeeDetails")(knex);

const add_employee = employee_name => {
  knex("employee")
    .insert({
      employee_name: employee_name,
      employee_unique_id: uniqid()
    })
    .then(res => {
      console.log(`employee '${employee_name}' added to employee table`, res);
    })
    .catch(err => console.error(err));
};

// add_employee("Andrew");

const add_kpi = kpi_name => {
  knex("kpi")
    .insert({
      kpi_name: kpi_name
    })
    .then(res => {
      console.log(`employee '${kpi_name}' added to employee table`, res);
    })
    .catch(err => console.error(err));
};


// adding employee to user table and employee table
var route = express.Router();
require('./Routes/Signup')(route,knex);
app.use('/',route);

// sign in for the employee and returning employee data
var login = express.Router();
require('./Routes/Login')(login,knex,jwt);
app.use('/',login)

// sign in for the employee and returning employee data
var emp = express.Router();
require('./Routes/getEmployeeDetails')(emp,knex,jwt);
app.use('/',emp)

// posting new kpi target
var kpi_target = express.Router();
require('./Routes/post_kpi_target')(kpi_target,knex,jwt);
app.use('/',kpi_target)

// listening to the app
app.listen((PORT = 8000), err => {
  if (!err) {
    console.log(`Your app is running on port : ${PORT}`);
  }
});
