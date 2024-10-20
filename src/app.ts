import inquirer from 'inquirer';
import { pool } from './connection.js';

inquirer.prompt({
    message:"What do you want to do?",
    type:"list",
    name:"choose",
    choices:[
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update Employee Role',
        'Exit'
      ]
}).then (async answer => {
    switch (answer.choose) {
      // case 'View All Departments':
      //   viewAllDepartments();
      //   break;
      // case 'View All Roles':
      //   viewAllRoles();
      //   break;
      case 'View All Employees':
        await viewAllEmployees();
        break;
      // case 'Add a Department':
      //   addDepartment();
      //   break;
      // case 'Add a Role':
      //   addRole();
      //   break;
      // case 'Add an Employee':
      //   addEmployee();
      //   break;
      // case 'Update Employee Role':
      //   updateEmployeeRole();
      //   break;
      case 'Exit':
        process.exit();
    }
  });


// async function viewAllDepartments(){
//     const result = pool.query()
//     console.log(result);
// }
// async function viewAllRoles(){
//     const client = await db.connect();
//     const result =client.query('')
//     console.log(result);
// }
async function viewAllEmployees(){
    const client = await pool.connect();
    const result = await client.query('SELECT first_name, last_name FROM employee')
    console.log(result);
}
// async function addDepartment(){
//     const client = await db.connect();
//     const result =client.query('')
//     console.log(result);
// }
// async function addRole(){
//     const client = await db.connect();
//     const result =client.query('')
//     console.log(result);
// }
// async function addEmployee(){
//     const client = await db.connect();
//     const result =client.query('')
//     console.log(result);
// }
// async function updateEmployeeRole(){
//     const client = await db.connect();
//     const result =client.query('')
//     console.log(result);
// }




