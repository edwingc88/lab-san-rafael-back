-- creacion de database
DROP DATABASE IF EXISTS laboratory;
CREATE DATABASE laboratory;

USE laboratory;

-- crear la tabla postgress

create extension if not exists "uuid-ossp";

-- SQL


CREATE TABLE IF NOT EXISTS role (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO role (id,name) VALUES
(1,'super-admin'),
(2,'admin'),
(3,'bioanalyst'),
(4,'patient'); 

---

CREATE TABLE IF NOT EXISTS person (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dni VARCHAR(255) NOT NULL UNIQUE ,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE, 
    birthdate DATE NOT NULL,
    gender VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    mobilephone VARCHAR(255) NOT NULL,
    homephone VARCHAR(255) null,
    blood_typing VARCHAR(255) null,
    created DATE NOT NULL,
    picture_url VARCHAR(255) null,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id)
);


INSERT INTO person (id ,dni, password, firstname, lastname, email, birthdate, gender, address, mobilePhone, homePhone, blood_typing, created, picture_url, role_id) VALUES (uuid_generate_v4(),'12345678','1234','Juan','Perez','juan@gmail.com','2000-01-01','Masculino','Calle 1 # 2-3','1234567890','1234567890','O+','2020-01-01','https://images.freeimages.com/images/large-previews/ddf/tour-d-eiffel-1447025.jpg',1);


CREATE TABLE IF NOT EXISTS relationship (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(255) null,
    name VARCHAR(255) null,
    phone VARCHAR(255) null,
    email VARCHAR(255) null,
    person_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE IF NOT EXISTS lab (
   id serial PRIMARY KEY,
   name VARCHAR(255) NOT NULL UNIQUE
);
