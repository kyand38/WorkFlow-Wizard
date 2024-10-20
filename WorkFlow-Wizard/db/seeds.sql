INSERT INTO department (department_name)
VALUES ('Engineering'),
('Human Resources'),
('Sales'),
('Production');

INSERT INTO role (title, salary, department_id)
VALUES ('Hiring manager', 75000, 2),
('Junior Engineer', 95000, 1),
('Sales Associate', 85000, 3),
('Welder', 45000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, NULL),
('Jane', 'Doe', 2, 1),
('Jennifer', 'Andrews', 3, NULL),
('Jim', 'Wells', 4, NULL);