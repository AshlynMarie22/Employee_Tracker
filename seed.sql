DROP DATABASE IF EXISTS trackerDB;

CREATE DATABASE trackerDB;

USE trackerDB;

CREATE TABLE department(
    id INT unique,
    department_name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT unique,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,4) NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
    
);
CREATE TABLE employee(
    id INT unique,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)

)

select * from department;

select * from role;

select * from employee;