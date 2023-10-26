-- creacion de database
DROP DATABASE IF EXISTS laboratory;
CREATE DATABASE laboratory;


USE laboratory;

-- crear la tabla postgress

create extension if not exists "uuid-ossp";

-- Mysql

CREATE TABLE IF NOT EXISTS person (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dni VARCHAR(255) NOT NULL ,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL, 
    birthdate DATE NOT NULL,
    gender VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    mobilephone VARCHAR(255) NOT NULL,
    homephone VARCHAR(255),
    blood_typing VARCHAR(255),
    created DATE NOT NULL,
    picture_url VARCHAR(255),
    role_id INT references role(id)
);

---
CREATE TABLE role (
id serial PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO role (name) VALUES
('super-admin'),
('admin'),
('bioanalyst'),
('patient'); 

INSERT INTO person (id ,dni, password, firstname, lastname, email, birthdate, gender, address, mobilePhone, homePhone, blood_typing, created, picture_url, role_id) VALUES (uuid_generate_v4(),'12345678','12345678','Juan','Perez','XXXXXXXXXXXXXX','2000-01-01','Masculino','Calle 1 # 2-3','1234567890','1234567890','O+','2020-01-01','https://images.freeimages.com/images/large-previews/ddf/tour-d-eiffel-1447025.jpg',1),(uuid_generate_v4(),'87654321','87654321','Maria','Lopez','XXXXXXXXXXXXXX','2000-01-01','Femenino','Calle 1 # 2-3','1234567890','1234567890','O+','2020-01-01','https://images.free',2);




postgres://admin:p6ojFg5VZwQW2sbHCR6fRR5MzEvBtwFs@dpg-ck09konhdsdc73813vjg-a.oregon-postgres.render.com/labdb_ydvc

postgres://admin:p6ojFg5VZwQW2sbHCR6fRR5MzEvBtwFs@dpg-ck09konhdsdc73813vjg-a.oregon-postgres.render.com/labdb_ydvc