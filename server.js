var mysql = require("mysql");
var inquirer = require("inquirer");
const { type } = require("os");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Spring22!",
  database: "trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runTracker();
});

function runTracker() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add department":
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "View departments":
          viewDepartments();
          break;

        case "View roles":
          viewRoles();
          break;

        case "View employees":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployees();
          break;
      }
    });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department_name",
        type: "input",
        message: "Please enter department name:",
      },
      {
        name: "id",
        type: "input",
        message: "Please enter department id:",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: answer.department_name,
          id: answer.id,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was created successfully");
          runTracker();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Please enter role title:",
      },
      {
        name: "id",
        type: "input",
        message: "Please enter role id:",
      },
      {
        name: "salary",
        type: "input",
        message: "Please enter role salary:",
      },
      {
        name: "department_id",
        type: "input",
        message: "Please enter department id:",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          id: answer.id,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was created successfully");
          runTracker();
        }
      );
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Please enter employee's first name:",
      },
      {
        name: "last_name",
        type: "input",
        message: "Please enter employee's last name:",
      },
      {
        name: "id",
        type: "input",
        message: "Please enter employee id:",
      },
      {
        name: "role_id",
        type: "input",
        message: "Please enter role id:",
      },
      {
        name: "manager_id",
        type: "input",
        message: "Please enter manager id:",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          id: answer.id,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was created successfully");
          runTracker();
        }
      );
    });
}
function viewDepartments() {
  console.log("Selecting all departments...\n");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    runTracker();
  });
}
function viewRoles() {
  console.log("Selecting all roles...\n");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    runTracker();
  });
}
function viewEmployees() {
  console.log("Selecting all employee...\n");
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.title, role.salary, employee.manager_id FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id ORDER BY employee.last_name", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    runTracker();
  });
}
function updateEmployees() {
  console.log("Updating employee role...\n");
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Please enter the employee id you would like to update:",
      },
      {
        name: "role_id",
        type: "input",
        message: "Please enter new role id:",
      },
    ])
    .then(function (answer) {
      var query = connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: answer.role_id,
          },
          {
            id: answer.id,
          },
        ],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " products updated!\n");
          // Call deleteProduct AFTER the UPDATE completes
          runTracker();
        }
      );

      // logs the actual query being run
      console.log(query.sql);
    });
}
