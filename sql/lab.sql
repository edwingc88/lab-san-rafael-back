 -- creacion de databasecoles
-- DROP DATABASE IF EXISTS laboratory;
-- CREATE DATABASE laboratory;
-- USE laboratory;

-- TRUNCATE TABLE role CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS relationship CASCADE;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS parameter CASCADE;
DROP TABLE IF EXISTS exam CASCADE;
DROP TABLE IF EXISTS exam_category CASCADE;
DROP TABLE IF EXISTS lab;
DROP TABLE IF EXISTS reference;
DROP TABLE IF EXISTS states CASCADE;
DROP TABLE IF EXISTS patient CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS category_orders_result;
DROP TABLE IF EXISTS exam_order_results;
DROP TABLE IF EXISTS exam_orders_result;
DROP TABLE IF EXISTS sub_category;
DROP TABLE IF EXISTS result CASCADE;
DROP TABLE IF EXISTS request;
DROP TABLE IF EXISTS result;
DROP TABLE IF EXISTS exam_category CASCADE;
DROP TABLE IF EXISTS orders CASCADE; 
DROP TABLE IF EXISTS orden; 
DROP TABLE IF EXISTS orders_exam CASCADE;
DROP TABLE IF EXISTS exam_order;
DROP TABLE IF EXISTS gender CASCADE;
DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS invoice CASCADE;

create extension if not exists "uuid-ossp";

---ALTER SEQUENCE RESTART;

-- crear la tabla postgress

-- SQL

--- create SEQUENCE num_seq MINVAUE 0 increment By 1

CREATE TABLE IF NOT EXISTS lab (
  lab_id serial PRIMARY KEY ,
  lab_name VARCHAR(255) NOT NULL UNIQUE,
  lab_rif VARCHAR(255) NOT NULL UNIQUE,
  lab_slogan VARCHAR(255) null,
  lab_description VARCHAR(255) null,
  lab_objetive VARCHAR(500) null,
  lab_mission VARCHAR(500) null,
  lab_vision VARCHAR(500) null,
  lab_email VARCHAR(255) null,
  lab_address VARCHAR(255) null,
  lab_phone VARCHAR(255) null,
  lab_logo VARCHAR(255) null
);

INSERT INTO lab (lab_name,lab_rif,lab_slogan,lab_description,lab_objetive,lab_mission,lab_vision,lab_email,lab_address,lab_phone,lab_logo) VALUES 
('Centro Medico Ambulatorio San Rafael','J-1234562','Para nosotros no hay nada mas importante que tu salud.','servicio de laboratorio','Somos una empresa que cuenta con personal altamente calificado y que trabaja con altos estándares de calidad y servicio en el área de análisis clínicos. Nuestros pacientes son nuestra razón de ser y es por ello que para satisfacerlos utilizamos tecnología de vanguardia y los más exigentes controles de calidad, para poder brindarles la mayor confiabilidad en sus resultados.','Ofrecer un servicio de Laboratorio Clínico excepcional,  donde nuestros usuarios se sientan satisfechos y plenos por la atención ofrecida en todos nuestros departamentos. Distinguirnos como un laboratorio extraordinario donde la excelencia de nuestros procedimientos y atención  al userse nos distinga.','Posicionarnos como un Laboratorio Clínico innovador y de alta calidad, que ofrezca a sus pacientes soluciones que permitan el preciso diagnóstico médico y oportuno tratamiento. Queremos ser una empresa resulterente en el sector salud, que la excelencia sea nuestro estandarte.','lab@gmail.com','Ciudad Guayana 8050, Bolívar. Core 8','0286-9530505','https://lab-san-rafael-api.onrender.com/sources/images/public/logo.png');

CREATE TABLE IF NOT EXISTS role (
    role_id serial PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO role (role_name) VALUES
('manager'),
('admin'),
('bio'),
('patient'); 

CREATE TABLE IF NOT EXISTS users (
    /* users_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),*/
    users_id serial PRIMARY KEY,
    users_dni VARCHAR(255) UNIQUE NULL,
    users_email VARCHAR(255) NOT NULL UNIQUE,
    users_username VARCHAR NOT NULL UNIQUE,
    users_password VARCHAR(255) NOT NULL,
    users_firstname VARCHAR(255) NOT NULL,
    users_lastname VARCHAR(255) NOT NULL,
    users_gender VARCHAR(255),
    users_address VARCHAR(255),
    users_firstphone VARCHAR(255) NOT NULL,
    users_secondphone VARCHAR(255) NULL,
    users_birthdate DATE,
    users_bloodtyping VARCHAR(255),
    users_type_relationship VARCHAR(255) NULL,
    users_name_relationship VARCHAR(255) NULL,
    users_created DATE,
    users_abatar VARCHAR(255),
    users_id_role INT NULL,
    FOREIGN KEY (users_id_role) REFERENCES role(role_id) ON DELETE CASCADE
);

INSERT INTO users (users_dni,users_email,users_username,users_password,users_firstname,users_lastname,users_gender,users_address,users_firstphone,users_secondphone,users_birthdate,users_bloodtyping,users_type_relationship,users_name_relationship, users_created,users_abatar,users_id_role) VALUES ('v-1234','michelledellosa7@gmail.com','michelle','12345678','Michelle','Dellza','Femenino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',1),('v-24796','edwin@gmail.com','edwin','1234','edwin','mendez','Masculino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',2),('v-333','bio@gmail.com','bio','33333','Michelle','Dellza','Masculino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',3),('v-4444','patient@gmail.com','patient','44444','Patient','Dellza','Masculino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',4);



 CREATE TABLE IF NOT EXISTS states(
   states_id serial PRIMARY KEY,
   states_name VARCHAR(255),
   states_description VARCHAR(255)
);

INSERT INTO states (states_name,states_description) VALUES
('PENDIENTE','PENDIENTE por pagar'),
('PAGADO','PAGADO, Listo para tomar muestra'),
('ANULADO','ANULADO o cancelado'),
('MUESTRA TOMADA', 'MUESTRA TOMADA listo para analizar'),
('ANALISIS REALIZADO', 'ANALISIS REALIZADO listo para verificar datos '),
('ANALISIS VERIFICADO', 'ANALISIS VERIFICADO listo para entregar resultados'),
('RESULTADO ENTREGADO', 'RESULTADO ENTREGADO proceso terminada ya entregado');


CREATE TABLE IF NOT EXISTS category (
   category_id serial PRIMARY KEY,
   category_name VARCHAR(255) NOT NULL UNIQUE,
   category_price FLOAT
);

INSERT INTO category (category_id,category_name,category_price) VALUES
(1,'HEMATOLOGÍA y BIOQUIMICA SANGUINEA',20.0),
(2,'UROLOGIA - NEFROLOGIA',null),
(3,'HECES',10.0),
(4,'INMUNO - DIAGNOSTICO',8.0);

CREATE TABLE IF NOT EXISTS exam (
   exam_id serial PRIMARY KEY ,
   exam_name VARCHAR(255) NOT NULL,
   exam_description VARCHAR(255),
   exam_price NUMERIC,
   exam_id_category INT,
   FOREIGN KEY (exam_id_category) REFERENCES category(category_id) ON DELETE SET NULL
);

INSERT INTO exam (exam_id,exam_name,exam_description,exam_price,exam_id_category) VALUES
(1,'Hematologia','examen de hermatogolia',4.0,1),
(2,'Urea','examen de Bioquimica',4.0,1),
(3,'glicemia','examen de Bioquimica',4.0,1),
(4,'creatinina','examen de Bioquimica',4.0,1),
(5,'trigliceridos','examen de Bioquimica',4.0,1),
(6,'Orina','examen de Orina',4.0,2),
(7,'Heces','examen de Heces',4.0,3),
(8,'Prueba de embarazo','examen de INMUNOLOGIA',4.0,4);

CREATE TABLE IF NOT EXISTS parameter (
   parameter_id serial PRIMARY KEY ,
   parameter_name VARCHAR(255) NOT NULL,
   parameter_description VARCHAR(255),
   parameter_value VARCHAR(255),
   parameter_unit VARCHAR(255),
   parameter_id_exam INT,
   FOREIGN KEY (parameter_id_exam) REFERENCES exam(exam_id) ON DELETE SET NULL
);

INSERT INTO parameter (parameter_id,parameter_name,parameter_value,parameter_unit,parameter_id_exam) VALUES
(1,'Lymph#','10-15','hz',1),
(2,'Mid#','hz','10-15',1),
(3,'Gran#','hz','10-15',1),
(4,'Lymph%','hz','10-15',1),
(5,'Urea','hz','10-15',2),
(6,'glicemia','hz','10-15',3),
(7,'creatinina','hz','10-15',4),
(8,'trigliceridos','hz','10-15',5),
(9,'Orina color','hz','10-15',6),
(10,'Orina aspecto','hz','10-15',6),
(11,'Heces color','hz','10-15',7),
(12,'Heces aspecto','hz','10-15',7),
(13,'Prueba de embarazo PCR','hz','10-15',8);


CREATE TABLE IF NOT EXISTS orders (
  orders_id serial PRIMARY KEY,
  orders_number INT,
  orders_date DATE,
  orders_observation VARCHAR(255),
  orders_id_users INT NOT NULL,  
  orders_id_states INT NULL,
  FOREIGN KEY (orders_id_users) REFERENCES users(users_id) ON DELETE CASCADE,
  FOREIGN KEY (orders_id_states) REFERENCES states(states_id) 
);

INSERT INTO orders (orders_id, orders_number, orders_date, orders_observation, orders_id_users, orders_id_states) VALUES
(1, 1, '2023-05-01', 'ninguna', 1, 1),
(2, 2, '2023-05-02', 'ninguna', 2, 1),
(3, 3, '2023-05-03', 'ninguna', 3, 1);


CREATE TABLE IF NOT EXISTS exam_order(
   exam_order_id serial PRIMARY KEY ,
   exam_order_id_exam INT NOT NULL,
   exam_order_id_orders INT NOT NULL,
   FOREIGN KEY (exam_order_id_exam) REFERENCES exam(exam_id) ON DELETE CASCADE,
   FOREIGN KEY (exam_order_id_orders) REFERENCES orders(orders_id) ON DELETE CASCADE
);

INSERT INTO exam_order (exam_order_id, exam_order_id_exam, exam_order_id_orders) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 2),
(7, 7, 2),
(8, 8, 3);


CREATE TABLE IF NOT EXISTS result (
  result_id serial PRIMARY KEY ,
  result_value FLOAT,
  result_id_parameter INT NOT NULL,
  result_id_order INT NOT NULL,
  FOREIGN KEY (result_id_parameter) REFERENCES parameter(parameter_id) ON DELETE CASCADE,
  FOREIGN KEY (result_id_order) REFERENCES orders(orders_id) ON DELETE CASCADE,
  CONSTRAINT u_result_parameter_order UNIQUE (result_id_parameter, result_id_order)
);


INSERT INTO result (result_id, result_value, result_id_parameter, result_id_order) VALUES
(1, 10.0, 1, 1),
(2, 20.0, 2, 1),
(3, 30.0, 3, 1),
(4, 40.0, 4, 1),
(5, 50.0, 5, 1),
(6, 60.0, 6, 1),
(7, 70.0, 7, 1),
(8, 80.0, 8, 1),
(9, 90.0, 9, 2),
(10, 100.0, 10, 2),
(11, 110.0, 11, 2),
(12, 120.0, 12, 2),
(16, 160.0, 13, 3);


CREATE TABLE IF NOT EXISTS invoice(
  invoice_id serial PRIMARY KEY,
  invoice_total NUMERIC,
  invoice_method_payment VARCHAR(255),
  invoice_reference_payment VARCHAR(255) NULL,
  invoice_states_payment BOOLEAN,
  invoice_states_date DATE,
  invoice_id_orders INT NOT NULL,
  FOREIGN KEY (invoice_id_orders) REFERENCES orders(orders_id) ON DELETE CASCADE
);

INSERT INTO invoice (invoice_id, invoice_total, invoice_method_payment, invoice_reference_payment, invoice_states_payment, invoice_states_date, invoice_id_orders) VALUES
(1, 100.0, 'efectivo', 'efectivo', true, '2023-05-01', 1),
(2, 200.0, 'efectivo', 'efectivo', true, '2023-05-02', 2);

 ALTER SEQUENCE exam_exam_id_seq RESTART WITH 9; 
 ALTER SEQUENCE users_users_id_seq RESTART WITH 5;
 ALTER SEQUENCE parameter_parameter_id_seq RESTART WITH 14;
 ALTER SEQUENCE orders_orders_id_seq RESTART WITH 4;
 ALTER SEQUENCE invoice_invoice_id_seq RESTART WITH 3;
 
 
