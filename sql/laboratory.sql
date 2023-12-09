-- creacion de database
-- DROP DATABASE IF EXISTS laboratory;
-- CREATE DATABASE laboratory;

-- USE laboratory;

 

-- INSERT INTO person (id ,dni, password, firstname, lastname, email, birthdate, gender, address, mobilePhone, homePhone, blood_typing, created, picture_url, role_id) VALUES (uuid_generate_v4(),'12345678','1234','Juan','Perez','juan@gmail.com','2000-01-01','Masculino','Calle 1 # 2-3','1234567890','1234567890','O+','2020-01-01','https://images.freeimages.com/images/large-previews/ddf/tour-d-eiffel-1447025.jpg',1);

--
-- postgres://admin:p6ojFg5VZwQW2sbHCR6fRR5MzEvBtwFs@dpg-ck09konhdsdc73813vjg-a.oregon-postgres.render.com/labdb_ydvc

-- p6ojFg5VZwQW2sbHCR6fRR5MzEvBtwFs
--
TRUNCATE TABLE role CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS relationship CASCADE;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS exam CASCADE;
DROP TABLE IF EXISTS lab;
DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS patient;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS sub_category;
DROP TABLE IF EXISTS genre CASCADE;
DROP TABLE IF EXISTS movie CASCADE;




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


INSERT INTO client (dni,email,password,firstname,lastname,address,mobilePhone, created,picture_url,id_role) VALUES
('j-1234','admin@gmail.com','1234','admin','super','core 8','041432','1900-01-01','https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',1);


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
   objetive VARCHAR(500) null,
   mission VARCHAR(500) null,
   vision VARCHAR(500) null,
   email VARCHAR(255) null,
   address VARCHAR(255) null,
   phone VARCHAR(255) null,
   logo VARCHAR(255) null
);


INSERT INTO lab (name,rif,slogan,description,objetive,mission,vision,email,address,phone,logo) VALUES
('Centro Medico Ambulatorio San Rafael','J-1234562','Para nosotros no hay nada mas importante que tu salud.','servicio de laboratorio','Somos una empresa que cuenta con personal altamente calificado y que trabaja con altos estándares de calidad y servicio en el área de análisis clínicos. Nuestros pacientes son nuestra razón de ser y es por ello que para satisfacerlos utilizamos tecnología de vanguardia y los más exigentes controles de calidad, para poder brindarles la mayor confiabilidad en sus resultados.','Ofrecer un servicio de Laboratorio Clínico excepcional,  donde nuestros usuarios se sientan satisfechos y plenos por la atención ofrecida en todos nuestros departamentos. Distinguirnos como un laboratorio extraordinario donde la excelencia de nuestros procedimientos y atención  al cliente nos distinga.','Posicionarnos como un Laboratorio Clínico innovador y de alta calidad, que ofrezca a sus pacientes soluciones que permitan el preciso diagnóstico médico y oportuno tratamiento. Queremos ser una empresa referente en el sector salud, que la excelencia sea nuestro estandarte.','email','core 8','02864566','https://lab-san-rafael-api.onrender.com/sources/images/public/logo.jpeg');


CREATE TABLE IF NOT EXISTS sub_category (
   id serial PRIMARY KEY ,
   name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO sub_category (id,name) VALUES
(1,'EXAM'),
(2,'PERFIL');


CREATE TABLE IF NOT EXISTS category (
   id serial PRIMARY KEY ,
   name VARCHAR(255) NOT NULL UNIQUE,
   description VARCHAR(255) null,
   id_sub_category serial NOT NULL,
   FOREIGN KEY (id_sub_category) REFERENCES sub_category(id)
);

INSERT INTO category (name,id_sub_category) VALUES
('HEMATOLOGÍA Y BIOQUÍMICA SANGUÍNEA',1),
('HEMOSTASIA Y TROMBOSIS',1),
('ENDOCRINO - METABÓLICO',1),
('UROLOGIA - NEFROLOGIA',1),
('HECES',1),
('MARCADORES TUMORALES',1),
('BIOLOGÍA MOLECULAR',1),
('MICROBIOLOGÍA',1),
('PERFIL LES DIAGNÓSTICO',2),
('PERFIL ARTRITIS',2);

CREATE TABLE IF NOT EXISTS exam (
   id serial PRIMARY KEY ,
   name VARCHAR(255) NOT NULL UNIQUE,
   price FLOAT null,
   id_category serial NOT NULL,
   FOREIGN KEY (id_category) REFERENCES category(id)
);

INSERT INTO exam (name, price,id_category) VALUES
('Hematologia Completa',20,1),
('Hematologia Especial',30,1),
('VSG',30,1),
('Reticulocitos',10,1),
('Grupo Sanguíneo y RH',10,1),
('Tp. Tempo de protrombina',10,2);

