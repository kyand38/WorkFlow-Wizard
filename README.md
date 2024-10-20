# WorkFlow-Wizard

 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

 ## Description

 A command-line application that allows business owners to manage their departments, roles, and employees by interacting with a PostgreSQL database. It helps track employee roles, salaries, and departments efficiently.
 
 ## Table of Contents:

 -[Installation](#installation)<br/>
 -[Usage](#usage)<br/>
 -[Credits](#credits)<br/>
 -[License](#license)<br/>
 -[Features](#features)<br/>
 -[Questions](#questions)<br/>

## Installation: 

 - Clone the repository to your local machine: git clone <https://github.com/kyand38/WorkFlow-Wizard>
 - Navigate to the project directory: cd WorkFlow-Wizard
 - Install dependencies: npm install
 - Set up the PostgreSQL database: Run the SQL schema using: \i schema.sql
 - Configure environment variables by creating a .env file (e.g., DB_NAME, DB_USER, DB_PASSWORD).
 - Start the application: node src/app.js

## Usage:

 - Once the application is installed, run the following command from the corresponding terminal to start the app: node src/app.js
 - Follow the prompts to view and manage departments, roles, and employees. For example:
 - Select "View All Employees" to see a table of employee details.
 - Select "Add a Role" to add a new role with a salary and department.
 - Select "Update Employee Role" to change an employee’s position.

## Credits:

 - My tutor Jili Jiang helped me get started.


## License:

This application is covered under the following license: [MIT License](https://www.gnu.org/licenses/gpl-3.0)

## Features

 - View all departments, roles, and employees.  
 - Add new departments, roles, and employees.Update employee roles.  
 - View employee manager hierarchy.Delete departments, roles, or employees as needed.

## Questions

 - https://github.com/kyand38
 - kyand2024@gmail.com

