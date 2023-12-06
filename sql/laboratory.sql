-- creacion de database
-- DROP DATABASE IF EXISTS laboratory;
-- CREATE DATABASE laboratory;

-- USE laboratory;

 

-- INSERT INTO person (id ,dni, password, firstname, lastname, email, birthdate, gender, address, mobilePhone, homePhone, blood_typing, created, picture_url, role_id) VALUES (uuid_generate_v4(),'12345678','1234','Juan','Perez','juan@gmail.com','2000-01-01','Masculino','Calle 1 # 2-3','1234567890','1234567890','O+','2020-01-01','https://images.freeimages.com/images/large-previews/ddf/tour-d-eiffel-1447025.jpg',1);

--
-- postgres://admin:p6ojFg5VZwQW2sbHCR6fRR5MzEvBtwFs@dpg-ck09konhdsdc73813vjg-a.oregon-postgres.render.com/labdb_ydvc

-- postgres://admin:p6ojFg5VZwQW2sbHCR6fRR5MzEvBtwFs@dpg-ck09konhdsdc73813vjg-a.oregon-postgres.render.com/labdb_ydvc
--
TRUNCATE TABLE role CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS relationship;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS exam CASCADE;
DROP TABLE IF EXISTS lab;
DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS patient;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS sub_category;


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

CREATE TABLE IF NOT EXISTS client (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dni VARCHAR(255) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    address VARCHAR(255) ,
    mobilephone VARCHAR(255) NOT NULL,
    created DATE,
    picture_url VARCHAR(255),
    id_role INT NOT NULL,
    FOREIGN KEY (id_role) REFERENCES role(id)
);

CREATE TABLE IF NOT EXISTS patient (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dni VARCHAR(255) UNIQUE,
    email VARCHAR(255) null,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    address VARCHAR(255) ,
    mobilephone VARCHAR(255) NOT NULL,
    homephone VARCHAR(255) ,
    birthdate DATE,
    gender VARCHAR(255) ,
    blood_typing VARCHAR(255) ,
    relationship VARCHAR(255) null,
    created DATE,
    id_client uuid NOT NULL,
    FOREIGN KEY (id_client) REFERENCES client(id)
);

CREATE TABLE IF NOT EXISTS lab (
   id serial PRIMARY KEY ,
   name VARCHAR(255) NOT NULL UNIQUE,
   rif VARCHAR(255) NOT NULL UNIQUE,
   slogan VARCHAR(255) null,
   description VARCHAR(255) null,
   objetive VARCHAR(255) null,
   mission VARCHAR(255) null,
   vision VARCHAR(255) null,
   email VARCHAR(255) null,  
   address VARCHAR(255) null,
   phone VARCHAR(255) null,
   logo VARCHAR(255) null
);

CREATE TABLE IF NOT EXISTS exam (
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   name VARCHAR(255) NOT NULL UNIQUE,
   description VARCHAR(255) null,
   price FLOAT null
);

CREATE TABLE IF NOT EXISTS sub_category (
   id serial PRIMARY KEY ,
   name VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS category (
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   name VARCHAR(255) NOT NULL UNIQUE,
   description VARCHAR(255) null,
   id_exam uuid NOT NULL,
   id_sub_category serial NOT NULL,
   FOREIGN KEY (id_sub_category) REFERENCES sub_category(id),
   FOREIGN KEY (id_exam) REFERENCES exam(id)
);





