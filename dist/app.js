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
}).then(async (answer) => {
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
        // case 'Add a Department':
        //   addDepartment();
        //   break;
        case 'Add a Role':
            addRole('test title 2', 150000, 3);
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
    const result = await client.query('');
    console.table(result.rows);
    client.release();
}
async function viewAllRoles() {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM role');
    console.table(result.rows);
    client.release();
}
// function to view all employees on a table
async function viewAllEmployees() {
    const client = await pool.connect();
    const result = await client.query('SELECT first_name, last_name FROM employee');
    console.table(result.rows);
    client.release();
}
// async function addDepartment(){
//     const client = await db.connect();
//     const result =client.query('')
//     console.log(result);
// }
async function addRole(title, salary, department_id) {
    const client = await pool.connect();
    try {
        // TODO: parameterize the query 
        await client.query('BEGIN');
        const query = 'INSERT INTO role (title, salary, department_id)VALUES ($1, $2, $3);';
        const values = [title, salary, department_id]; // Pass your parameters in an array
        const result = await client.query(query, values);
        await client.query('COMMIT');
        console.table(result.rows);
    }
    catch (err) {
        await client.query('ROLLBACK');
        console.error('Error inserting role:', err);
    }
    finally {
        if (client) {
            client.release();
        }
    }
}
// inquirer.prompt([
//   name: 'NewRole',
//   message: 'New Role Title?',
//   type: 'input',
// ]);
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
