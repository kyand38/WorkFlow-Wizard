import inquirer from 'inquirer';
import { pool } from './connection.js';

inquirer.prompt({
  message: "What do you want to do?",
  type: "list",
  name: "choose",
  choices: [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update Employee Role',
    'Exit'
  ]
}).then(async answer => {
  switch (answer.choose) {
    case 'View All Departments':
      viewAllDepartments();
      break;
    case 'View All Roles':
      viewAllRoles();
      break;
    case 'View All Employees':
      await viewAllEmployees();
      break;
    case 'Add a Department':
      addDepartment();
      break;
    case 'Add a Role':
      addRole();
      break;
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


async function viewAllDepartments() {
  const client = await pool.connect();
  const result = await client.query('')
  // TODO: handle errors
  console.table(result.rows);
  client.release();
}
async function viewAllRoles() {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM role')
  // TODO: handle errors
  console.table(result.rows);
  client.release();
}
// function to view all employees on a table
async function viewAllEmployees() {
  const client = await pool.connect();
  const result = await client.query('SELECT first_name, last_name FROM employee')
  // TODO: handle errors
  console.table(result.rows);
  client.release();

}

async function addDepartment() {
  const { departmentName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the new department name:',
    },
  ]);

  try {
    const client = await pool.connect();
    await client.query('INSERT INTO department (department_name) VALUES ($1)', [departmentName]);
    console.log(`Department "${departmentName}" added successfully.`);
    client.release();
  } catch (err) {
    console.error('Error adding department:', err);
  }
}

;

  // show user list of departments

  //pass answers into addRoleToDb
//   await client.query('BEGIN');
//   await client.query('COMMIT');
//   await client.query('ROLLBACK');
// // }

async function addRole(title: string, salary: number, department_id: number) {
  const client = await pool.connect();
  try {
    // TODO: parameterize the query 
    const answers = await inquirer.prompt([
      message: 'New role title?',
      name: 'newTitle',
      type: 'input',
  
      //get salary from user
      message: 'New salary?',
      name: 'newSalary',
      type: 'input',
  
      // get department from user
      message: '?',
      name: 'newDepartment'
      type: 'input',
  
    ])

    const query = 'INSERT INTO role (title, salary, department_id)VALUES ($1, $2, $3);';
    const values = [answers.newTitle, answers.newSalary, answers.newDepartment]; // Pass your parameters in an array
    const result = await client.query(query, values);

    console.table(result.rows);
  } catch (err) {
    console.error('Error inserting role:', err);
  } finally {
    if (client) {
      client.release()
    }
  }
}

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




