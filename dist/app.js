import inquirer from 'inquirer';
import { pool } from './connection.js';
async function mainMenu() {
    await inquirer.prompt({
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
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                console.log('Have a nice day!');
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
    const result = await client.query('SELECT * FROM employee');
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
        //query and log current roles
        const currentRoles = await client.query('SELECT title, department_id FROM role');
        // display roles for the user
        console.log('Current roles');
        console.table(currentRoles.rows);
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
            // get new department id from user
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
async function addEmployee() {
    const client = await pool.connect();
    try {
        const currentEmployees = await client.query('SELECT (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) FROM employee');
        // display employees for the user
        console.log('Current employes');
        console.table(currentEmployees.rows);
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
                message: 'Enter role id number',
                name: 'roleId',
                type: 'input',
            },
            {
                message: 'Enter the manager id from the above table.',
                name: 'managerId',
                type: 'input',
            }
        ]);
        // Parameterized query for insertion
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) returning *;';
        // Pass your parameters in an array
        const values = [employee.firstName, employee.lastName, employee.roleId, employee.managerId];
        // execute and return
        const result = await client.query(query, values);
        // console log result
        console.log(`New employee "${employee.firstName}" "${employee.lastName}" added successfully!`);
        console.table(result.rows);
        client.release();
        // release connection from the pool
    }
    catch (err) {
        console.error('Error inserting new employee:', err);
    }
}
async function updateEmployeeRole() {
    const client = await pool.connect();
    try {
        await inquirer.prompt([
            {
                name: 'employeeId',
                message: 'What is the employee ID?',
                type: 'number',
            },
            {
                name: 'employeeRole',
                message: 'Enter a new role ID.',
                type: 'number',
            }
        ])
            .then(async (response) => {
            await client.query(`UPDATE employee FROM SET role_id = ${response.employeeRole} WHERE id = ${response.employeeId} RETURNING *`, (_err, _result) => {
                // const query = 'UPDATE employee FROM SET role_id = $1 WHERE id = $2 RETURNING *';
                // const value = [response.employeeRole, response.employeeId]
                // const result = await client.query()
                console.log('Updated successfully!');
                // console.table(result.rows);
            });
        });
    }
    catch (err) {
        console.error('Error updating employee role:', err);
    }
}
mainMenu();
