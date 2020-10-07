var mysql = require("mysql");
var inquirer = require("inquirer");
const { type } = require("os");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
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
          "Update employee role"
        ]
      })
      .then(function(answer) {
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
  function addDepartment(){
      inquirer
      .prompt([
          {
              name: 'name',
              type: 'input',
              message: 'Please enter department name:'
          },
          {
            name: 'id',
            type: 'input',
            message: 'Please enter department id:'
        }
      ])
      .then(function(answer){
          connection.query(
              'INSERT INTO role SET ?',
              {
                  name: answer.name,
                  id: answer.id
              },
              function (err){
                  if(err) throw err;
                  console.log('Your department was created successfully');
                  runTracker();
              }
          );
      });
  }
  function addRole(){
    inquirer
    .prompt([
    {
        name: 'title',
        type: 'input',
        message: 'Please enter role title:'
    },
    {
        name: 'id',
        type: 'input',
        message: 'Please enter role id:'
    },
    {
        name: 'salary',
        type: 'input',
        message: 'Please enter role salary:'
    },
    {
        name: 'department_id',
        type: 'input',
        message: 'Please enter department id:'
    }
    ])
    .then(function(answer){
        connection.query(
            'INSERT INTO department SET ?',
            {
                title: answer.title,
                id: answer.id,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function (err){
                if(err) throw err;
                console.log('Your department was created successfully');
                runTracker();
            }
        );
    });
}
function addEmployee(){
    inquirer
    .prompt([
    {
        name: 'first_name',
        type: 'input',
        message: "Please enter employee's first name:"
    },
    {
        name: 'last_name',
        type: 'input',
        message: "Please enter employee's last name:"
    },
    {
        name: 'id',
        type: 'input',
        message: 'Please enter role id:'
    },
    {
        name: 'manager_id',
        type: 'input',
        message: 'Please enter manager id:'
    }
    ])
    .then(function(answer){
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                id: answer.id,
                manager_id: answer.manager_id
            },
            function (err){
                if(err) throw err;
                console.log('Your department was created successfully');
                runTracker();
            }
        );
    });
}