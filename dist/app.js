import inquirer from 'inquirer';
import { pool } from './connection.js';
async function mainMenu() {
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
                await viewAllDepartments();
                break;
            case 'View All Roles':
                await viewAllRoles();
                break;
            case 'View All Employees':
                await viewAllEmployees();
                break;
            case 'Add a Department':
                await addDepartment();
                break;
            case 'Add a Role':
                await addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            // case 'Update Employee Role':
            //   updateEmployeeRole();
            //   break;
            case 'Exit':
                console.log('Take care!');
                process.exit();
        }
        await mainMenu();
    });
}
async function viewAllDepartments() {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM department');
    // TODO: handle errors
    console.table(result.rows);
    client.release();
}
async function viewAllRoles() {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM role');
    // TODO: handle errors
    console.table(result.rows);
    client.release();
}
// function to view all employees on a table
async function viewAllEmployees() {
    const client = await pool.connect();
    const result = await client.query('SELECT first_name, last_name FROM employee');
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
    }
    catch (err) {
        console.error('Error adding department:', err);
    }
}
async function addRole() {
    const client = await pool.connect();
    try {
        //query and log current departments with id
        const currentDepartments = await client.query('SELECT id, department_name FROM department');
        // display departments for the user
        console.log('Available departments');
        console.table(currentDepartments.rows);
        const role = await inquirer.prompt([
            // get new title from user
            {
                message: 'New role title? (30 characters max)',
                name: 'newTitle',
                type: 'input',
            },
            //get new salary from user
            {
                message: 'New salary?',
                name: 'newSalary',
                type: 'input',
            },
            // get new department from user
            {
                message: 'Enter the department id from the above table.',
                name: 'newDepartment',
                type: 'input',
            }
        ]);
        // Parameterized query for insertion
        const query = 'INSERT INTO role (title, salary, department_id)VALUES ($1, $2, $3);';
        // Pass your parameters in an array
        const values = [role.newTitle, role.newSalary, role.newDepartment];
        // execute and return
        const result = await client.query(query, values);
        // console log result
        console.log(`New role "${role.newTitle}" added successfully!`);
        console.table(result.rows);
        client.release();
        // release connection from the pool
    }
    catch (err) {
        console.error('Error inserting role:', err);
    }
}
// first_name, last_name, role_id, manager_id
async function addEmployee() {
    const client = await pool.connect();
    try {
        const employee = await inquirer.prompt([
            // get new title from user
            {
                message: 'New first name?',
                name: 'firstName',
                type: 'input',
            },
            //get new salary from user
            {
                message: 'New last name?',
                name: 'lastName',
                type: 'input',
            },
            // get new department from user
            {
                message: 'Enter role id',
                name: 'roleId',
                type: 'input',
            },
            {
                message: 'Enter the department id from the above table.',
                name: 'departmentId',
                type: 'input',
            }
        ]);
        // Parameterized query for insertion
        const query = 'INSERT INTO role (title, salary, department_id)VALUES ($1, $2, $3);';
        // Pass your parameters in an array
        const values = [employee.firstName, employee.lastName, employee.roleId, employee.departmentId];
        // execute and return
        const result = await client.query(query, values);
        // console log result
        console.log(`New employee "${employee.firstName}" "${employee.lastName}" added successfully!`);
        console.table(result.rows);
        client.release();
        // release connection from the pool
    }
    catch (err) {
        console.error('Error inserting role:', err);
    }
}
// async function updateEmployeeRole(){
//     const client = await db.connect();
//     const result =client.query('')
//     console.log(result);
// }
mainMenu();
