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
DROP TABLE IF EXISTS status CASCADE;
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
DROP TABLE IF EXISTS payment CASCADE;
DROP TABLE IF EXISTS exam_order_relation CASCADE;
DROP TABLE IF EXISTS payment_status CASCADE;
DROP TABLE IF EXISTS order_status CASCADE;
DROP TABLE IF EXISTS payment_statu CASCADE;
DROP TABLE IF EXISTS order_statu CASCADE;

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
('gerente'),
('administrado'),
('bioanalista'),
('paciente'); 

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
    users_created DATE DEFAULT CURRENT_TIMESTAMP,
    users_abatar VARCHAR(255),
    users_id_role INT NULL,
    FOREIGN KEY (users_id_role) REFERENCES role(role_id) ON DELETE CASCADE
);

INSERT INTO users (users_dni,users_email,users_username,users_password,users_firstname,users_lastname,users_gender,users_address,users_firstphone,users_secondphone,users_birthdate,users_bloodtyping,users_type_relationship,users_name_relationship, users_created,users_abatar,users_id_role) VALUES ('v-1234','michelledellosa7@gmail.com','michelle','12345678','Michelle','Dellza','Femenino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',1),('v-24796','edwin@gmail.com','edwin','1234','edwin','mendez','Masculino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',2),('v-333','bio@gmail.com','bio','33333','Michelle','Dellza','Masculino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',3),('v-4444','maria@gmail.com','maria123','12345678','maria','perez','Femenino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',4),('v-5555','pedro@gmail.com','pedro1234','12345678','pedro','rodriguez','Masculino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',4),('v-666','elena@gmail.com','elena123','12345678','elena','garcias','Femenino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',4);



 CREATE TABLE IF NOT EXISTS order_statu(
   order_statu_id serial PRIMARY KEY,
   order_statu_name VARCHAR(255),
   order_statu_description VARCHAR(255)
);

INSERT INTO order_statu (order_statu_name,order_statu_description) VALUES
  ('PENDIENTE', 'PENDIENTE listo para tomar muestra'),
  ('MUESTRA TOMADA', 'MUESTRA TOMADA listo para analizar'),
  ('EN ANALISIS', 'ANALISIS REALIZADO listo para verificar datos '),
  ('COMPLETADO', 'ANALISIS VERIFICADO listo para entregar resultados'),
  ('ENTREGADO', 'RESULTADO ENTREGADO al usuario'),
  ('CANCELADO', 'ORDEN CANCELADA proceso cancelado');


CREATE TABLE IF NOT EXISTS category (
   category_id serial PRIMARY KEY,
   category_name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO category (category_id,category_name) VALUES
(1,'HEMATOLOGÍA'),
(2,'BIOQUIMICA SANGUINEA '),
(3,'UROLOGIA'),
(4,'HECES'),
(5,'INMUNOLOGIA');

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
(2,'Urea','examen de Bioquimica',4.0,2),
(3,'glicemia','examen de Bioquimica',4.0,2),
(4,'creatinina','examen de Bioquimica',4.0,2),
(5,'trigliceridos','examen de Bioquimica',4.0,2),
(6,'Acido Urico','examen de Bioquimica',1.0,2),
(7,'Calcio','examen de Bioquimica',4.0,2),
(8,'Orina','examen de Orina',4.0,3),
(9,'Heces','examen de Heces',4.0,4),
(10,'Prueba de embarazo','examen de INMUNOLOGIA',4.0,5);

CREATE TABLE IF NOT EXISTS parameter (
   parameter_id serial PRIMARY KEY ,
   parameter_name VARCHAR(255) NOT NULL,
   parameter_value VARCHAR(255),
   parameter_unit VARCHAR(255),
   parameter_id_exam INT,
   FOREIGN KEY (parameter_id_exam) REFERENCES exam(exam_id) ON DELETE SET NULL
);

INSERT INTO parameter (parameter_id,parameter_name,parameter_value,parameter_unit,parameter_id_exam) VALUES
(1,'Globulos Rojos','4.50 - 5.30','millones/ul',1),
(2,'Hemoglobina','13.00 - 16.00','gr/dl',1),
(3,'Hematocrito','37.00 - 49.00','%',1),
(4,'Recuento Globulos Blancos','4.50 - 11.00','miles/ul',1),
(5,'Eosinofilos','0 - 6','%',1),
(6,'Basofilos','0 - 2','%',1),
(7,'Neutrofilos','43 - 70','%',1),
(8,'Linfositos','21 - 50','%',1),
(9,'Monocitos','2 - 8','%',1),
(10,'Recuento de Plaquetas','142.00 - 424.00','miles/ul',1),
(11,'MCV','78.00 - 98.00','Femtolitro',1),
(12,'MCH','25.00 - 35.00','picogramos',1),
(13,'MCHC','31.00 - 37.00','gramp/decilitro',1),
(14,'Velocidad de Sedimiento','0.00 - 20.00','mm/1hora',1),
(15,'Urea','10-15','hz',2),
(16,'glicemia','10-15','hz',3),
(17,'creatinina','10-15','hz',4),
(18,'trigliceridos','10-15','hz',5),
(19,'Acido Urico', '10-15','hz', 6),
(20,'Calcio','10-15','hz', 7),
(21,'Orina color','','',8),
(22,'Orina aspecto','','',8),
(23,'Heces color','','',9),
(24,'Heces Consistencia','','',9),
(25,'Heces Restos Alimenticios','','',9),
(26,'Reaccion PH','','',9),
(27,'Prueba de embarazo PCR','10-15','hz',10);


CREATE TABLE IF NOT EXISTS orders (
  orders_id serial PRIMARY KEY,
  orders_number serial NOT NULL UNIQUE,
  orders_date DATE,
  orders_observation VARCHAR(255),
  orders_id_users INT NOT NULL,  
  orders_id_order_statu INT NULL,
  FOREIGN KEY (orders_id_users) REFERENCES users(users_id) ON DELETE CASCADE,
  FOREIGN KEY (orders_id_order_statu) REFERENCES order_statu(order_statu_id)  ON DELETE SET NULL
);

INSERT INTO orders (orders_id, orders_number, orders_date, orders_observation, orders_id_users, orders_id_order_statu) VALUES
(1, 1, '2023-05-01', 'ninguna', 4, 1),
(2, 2, '2023-05-02', 'ninguna', 5, 1),
(3, 3, '2023-05-03', 'ninguna', 6, 1);


CREATE TABLE IF NOT EXISTS exam_order_relation(
   exam_order_relation_id serial PRIMARY KEY ,
   exam_order_relation_id_exam INT NOT NULL,
   exam_order_relation_id_order INT NOT NULL,
   FOREIGN KEY (exam_order_relation_id_exam) REFERENCES exam(exam_id) ON DELETE CASCADE,
   FOREIGN KEY (exam_order_relation_id_order) REFERENCES orders(orders_id) ON DELETE CASCADE
);

INSERT INTO exam_order_relation (exam_order_relation_id, exam_order_relation_id_exam, exam_order_relation_id_order) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 8, 2),
(7, 9, 2),
(8, 10, 3);


CREATE TABLE IF NOT EXISTS result (
  result_id serial PRIMARY KEY ,
  result_value FLOAT,
  result_observation VARCHAR(255),
  result_id_parameter INT NOT NULL,
  result_id_exam INT NOT NULL,
  result_id_order INT NOT NULL,
  FOREIGN KEY (result_id_parameter) REFERENCES parameter(parameter_id) ON DELETE CASCADE,
  FOREIGN KEY (result_id_exam) REFERENCES exam(exam_id) ON DELETE CASCADE,
  FOREIGN KEY (result_id_order) REFERENCES orders(orders_id) ON DELETE CASCADE,
  CONSTRAINT u_result_parameter_order UNIQUE (result_id_parameter,  result_id_exam, result_id_order)
);


INSERT INTO result (result_id, result_value,result_observation, result_id_parameter, result_id_exam, result_id_order) VALUES
(1, 10.0,'', 1, 1, 1),
(2, 20.0,'', 2, 1, 1),
(3, 30.0,'', 3, 1, 1),
(4, 40.0,'', 4, 1, 1),
(5, 50.0,'', 5, 1, 1),
(6, 60.0,'', 6, 1, 1),
(7, 70.0,'', 7, 1, 1),
(8, 80.0,'', 8, 1, 1),
(9, 90.0,'', 11, 1, 1),
(10, 100.0,'', 12,1, 1),
(11, 110.0,'', 13,1, 1),
(12, 120.0,'', 14,1, 1),
(13, 120.0,'', 15,2, 1),
(14, 120.0,'', 16, 3, 1),
(15, 120.0,'', 17, 4, 1),
(16, 120.0,'', 18, 5, 1),
(17, 120.0,'', 19, 6, 1),
(18, 120.0,'', 20, 7, 1),
(19, null,'Amarillo', 21, 8, 2),
(20, null,'Liquido', 22, 8, 2),
(21, null,'Cafe', 23, 9, 2),
(22, null,'Pastosa', 24, 9, 2),
(23, null,'No se observa', 25, 9, 2),
(24, 6.00,'', 26, 9, 2),
(25, null,'positivo', 27, 10, 3);


/* CREATE TABLE IF NOT EXISTS invoice(
  invoice_id serial PRIMARY KEY,
  invoice_bs NUMERIC,
  invoice_dolar NUMERIC,
  invoice_method_payment VARCHAR(255),
  invoice_reference_payment VARCHAR(255) NULL,
  invoice_status_payment BOOLEAN CONSTRAINT invoice_status_payment_valido CHECK(invoice_status_payment IN ('true','false')) DEFAULT 'false',
  invoice_status_date DATE,
  invoice_id_orders INT NOT NULL,
  FOREIGN KEY (invoice_id_orders) REFERENCES orders(orders_id) ON DELETE CASCADE
);

INSERT INTO invoice (invoice_id, invoice_bs, invoice_dolar, invoice_method_payment, invoice_reference_payment, invoice_status_payment, invoice_status_date, invoice_id_orders) VALUES
(1, 100.20,0, 'efectivo', 'efectivo', true, '2023-05-01', 1),
(2, 0, 10,'efectivo', 'efectivo', true, '2023-05-02', 2); */

CREATE TABLE IF NOT EXISTS payment_statu(
  payment_statu_id serial PRIMARY KEY,
  payment_statu_name VARCHAR(255) NOT NULL UNIQUE,
  payment_statu_description VARCHAR(255) NULL
);

INSERT INTO payment_statu (payment_statu_id, payment_statu_name, payment_statu_description) VALUES
(1,'PAGADO','Pago realizado'),
(2,'ANULADO','Pago anulado'),
(3,'PENDIENTE','Pago pendiente');


CREATE TABLE IF NOT EXISTS payment(
  payment_id serial PRIMARY KEY,
  payment_bs NUMERIC,
  payment_dolar NUMERIC,
  payment_reference VARCHAR(255) NULL,
/*   payment_status BOOLEAN CONSTRAINT payment_status_valido CHECK(payment_status IN ('true','false')) DEFAULT 'false', */
  payment_id_payment_statu INT NOT NULL,
  payment_id_orders INT NOT NULL,
  FOREIGN KEY (payment_id_payment_statu) REFERENCES payment_statu(payment_statu_id) ON DELETE CASCADE,
  FOREIGN KEY (payment_id_orders) REFERENCES orders(orders_id) ON DELETE CASCADE
);

INSERT INTO payment (payment_id, payment_bs, payment_dolar, payment_reference, payment_id_payment_statu, payment_id_orders) VALUES
(1, 100.20,0, '1623153215',1, 1),
(2, 0, 10,'', 1, 2);



 ALTER SEQUENCE category_category_id_seq RESTART WITH 6; 
 ALTER SEQUENCE exam_exam_id_seq RESTART WITH 11; 
 ALTER SEQUENCE users_users_id_seq RESTART WITH 5;
 ALTER SEQUENCE parameter_parameter_id_seq RESTART WITH 28;
 ALTER SEQUENCE orders_orders_id_seq RESTART WITH 4;
 ALTER SEQUENCE orders_orders_number_seq RESTART WITH 4;
 ALTER SEQUENCE payment_payment_id_seq RESTART WITH 3;
 ALTER SEQUENCE exam_order_relation_exam_order_relation_id_seq RESTART WITH 9;
 
 
 
