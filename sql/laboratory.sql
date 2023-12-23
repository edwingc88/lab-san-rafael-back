-- creacion de databasecoles
-- DROP DATABASE IF EXISTS laboratory;
-- CREATE DATABASE laboratory;

-- USE laboratory;

 

-- INSERT INTO person (id ,dni, password, firstname, lastname, email, birthdate, gender, address, mobilePhone, homePhone, blood_typing, created, picture_url, role_id) VALUES (uuid_generate_v4(),'12345678','1234','Juan','Perez','juan@gmail.com','2000-01-01','Masculino','Calle 1 # 2-3','1234567890','1234567890','O+','2020-01-01','https://images.freeimages.com/images/large-previews/ddf/tour-d-eiffel-1447025.jpg',1);

--NEW
--postgres://lab_san_rafael_db_user:ftpPHRPljW2IQhDdodugAOgzbteg2Su9@dpg-clropq4m7d1c73f3kp30-a.oregon-postgres.render.com/lab_san_rafael_db
-- postgres://admin:p6ojFg5VZwQW2sbHCR6fRR5MzEvBtwFs@dpg-ck09konhdsdc73813vjg-a.oregon-postgres.render.com/labdb_ydvc

-- p6ojFg5VZwQW2sbHCR6fRR5MzEvBtwFs
--
-- TRUNCATE TABLE role CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS relationship CASCADE;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS exam CASCADE;
DROP TABLE IF EXISTS lab;
DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS patient CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS sub_category;
DROP TABLE IF EXISTS result CASCADE;
DROP TABLE IF EXISTS request;
DROP TABLE IF EXISTS reference; 
DROP TABLE IF EXISTS invoice CASCADE; 
DROP TABLE IF EXISTS invoice_exam CASCADE;
DROP TABLE IF EXISTS exam_category CASCADE;

---ALTER SEQUENCE RESTART;

-- crear la tabla postgress

-- SQL

--- create SEQUENCE num_seq MINVAUE 0 increment By 1


create extension if not exists "uuid-ossp";

CREATE TABLE IF NOT EXISTS role (
    role_id serial PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO role (role_id,role_name) VALUES
(1,'super-admin'),
(2,'admin'),
(3,'bioanalyst'),
(4,'patient'); 

---

CREATE TABLE IF NOT EXISTS client (
    client_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_dni VARCHAR(255) UNIQUE,
    client_email VARCHAR(255) NOT NULL UNIQUE, 
    client_password VARCHAR(255) NOT NULL,
    client_firstname VARCHAR(255) NOT NULL,
    client_lastname VARCHAR(255) NOT NULL,
    client_address VARCHAR(255) ,
    client_mobilephone VARCHAR(255) NOT NULL,
    client_created DATE,
    client_picture_url VARCHAR(255),
    client_id_role INT NOT NULL,
    FOREIGN KEY (client_id_role) REFERENCES role(role_id)
);


--INSERT INTO client (client_dni,client_email,client_password,client_firstname,client_lastname,client_address,client_mobilePhone, client_created,client_picture_url,client_id_role) VALUES
--('j-1234','admin@gmail.com','1234','admin','super','core 8','041432','1900-01-01','https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',1);


CREATE TABLE IF NOT EXISTS patient (
    patient_id SERIAL PRIMARY KEY,
    patient_dni VARCHAR(255) UNIQUE,
    patient_email VARCHAR(255) null,
    patient_firstname VARCHAR(255) NOT NULL,
    patient_lastname VARCHAR(255) NOT NULL,
    patient_address VARCHAR(255) ,
    patient_mobilephone VARCHAR(255) NOT NULL,
    patient_homephone VARCHAR(255) ,
    patient_birthdate DATE,
    patient_gender VARCHAR(255) ,
    patient_blood_typing VARCHAR(255) ,
    patient_relationship VARCHAR(255) null,
    patient_created DATE,
    patient_principal BOOLEAN,
    patient_id_client uuid NOT NULL,
    FOREIGN KEY (patient_id_client) REFERENCES client(client_id)
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

/*
CREATE TABLE IF NOT EXISTS sub_category (
   sub_category_id serial PRIMARY KEY ,
   sub_category_name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO sub_category (sub_category_id,sub_category_name) VALUES
(1,'EXAM'),
(2,'PERFIL');*/


CREATE TABLE IF NOT EXISTS category (
   category_id serial PRIMARY KEY,
   category_name VARCHAR(255) NOT NULL UNIQUE,
   category_description VARCHAR(255) null
);

INSERT INTO category (category_name) VALUES
('HEMATOLOGÍA'),
('BIOQUÍMICA SANGUÍNEA'),
('HEMOSTASIA Y TROMBOSIS'),
('ENDOCRINO - METABÓLICO'),
('UROLOGIA - NEFROLOGIA'),
('HECES'),
('MARCADORES TUMORALES'),
('INMUNO - DIAGNÓSTICO'),
('BIOLOGÍA MOLECULAR'),
('MICROBIOLOGÍA'),
('INFECCIOSAS'),
('INFECTOCONTAGIOZA'),
('PERFIL LES DIAGNÓSTICO'),
('PERFIL LES SEGUIMIENTO'),
('PERFIL LES ANTIFOSFOLÍPIDOS'),
('PERFIL ABORTO ESPONTÁNEO'),
('PERFIL LÚPIDO (IL/LAC)'),
('PERFIL ARTRITIS'),
('PERFIL ANCA'),
('PERFIL ENFERMEDAD CELÍACA'),
('PERFIL HEPÁTICO AUTOINMUNE'),
('PERFIL GLOMERULONEFRITIS'),
('PERFIL ESCLERODERMIA'),
('PERFIL TIROIDEO AUTOINMINE'),
('PERFIL SJOGREN'),
('PERFIL ENF.INFLAM.INSTESTINAL-CROHN'),
('PERFIL ALERGIAS'),
('PERFIL LIPIDO');



CREATE TABLE IF NOT EXISTS exam (
   exam_id serial PRIMARY KEY ,
   exam_name VARCHAR(255) NOT NULL,
   exam_price FLOAT null
);

INSERT INTO exam (exam_id,exam_name, exam_price) VALUES
(1,'Hematologia Completa',20),
(2,'PT',30),
(3,'PTT',30),
(4,'VSG',30),
(5,'Grupo Sanguíneo y RH',10),
(6,'Glicemia',10),
(7,'Glicemia Basal y Postprandial',10),
(8,'Urea en Suero',10),
(9,'Creatinina en Suero',10),
(10,'Acido Urico',10),
(11,'Transaminasa TGO',10),
(12,'Transaminasa TGP',10),
(13,'Cloro',10),
(14,'Calcio Sérico',10),
(15,'Fósforo Sérico',10),
(16,'Magnesio Sérico',10),
(17,'VDRL',10),
(18,'HIV Tipo 1 y 2',10),
(19,'Triglicéridos',5),
(20,'Sodio Sérico',7),
(21,'Potasio Sérico',7),
(22,'Magnesio Sérico',7),
(23,'Proteinas Totales y fraccionadas',7),
(24,'TGO Aminotransferasa',7),
(25,'TGP Aminotransferasa',7),
(26,'PCR Proteina C reactiva',7),
(27,'TP. Tiempo de protrombina',10),
(28,'INR. COntrol anticoagulados',10),
(29,'TTPa. Tiempo de Tromboplastina parcial activada',10),
(30,'TT. Tiempo de Tromboplastina ',10),
(31,'Colesterol Total',5),
(32,'HDL',5),
(33,'LDL',5),
(34,'VLDL',5);
/* ('TSH (Estimulante de Tiroides)',10,3),
('T3. Libre ',10,3),
('T4 Libre',1.5,3),
('Insulina Basal',1.5,3),
('Insulina Pre y Postprandial',1.5,3),
('Orina General',10,4),
('Depueracion de Creatinina',10,4),
('Proteinuria',10,4),
('Calcio',10,4),
('Fósforo',10,4),
('Oxalato',10,4),
('Citrato',10,4),
('Heces General',13,5),
('Azucar Reductores',6.5,5),
('Antic. Anti-Nucleares(cel Hep2) Dil: 1/140-1/160',10,7),
('Antic. Anti DNA (Crithindia lucialae)',10,7),
('Toxoplasma IgM',9,7),
('Toxoplamsa Igm',9,7),
('Helicobacter pylori',10,8),
('Denge',10,27),
('Factor Reumatoide (RA Test)',15,16),
('CH50',8.5,16),
('Panel 45 Alimentos IgG',25,25),
('Panel Alimento IgE',25,25),
('Panel inhalantes IgE',25,25),
 */

CREATE TABLE IF NOT EXISTS exam_category (
   ec_id serial PRIMARY KEY ,
   ec_id_exam serial NOT NULL,
   ec_id_category serial NOT NULL,
   FOREIGN KEY (ec_id_exam) REFERENCES exam(exam_id) ON DELETE CASCADE,
   FOREIGN KEY (ec_id_category) REFERENCES category(category_id) ON DELETE CASCADE
);

INSERT INTO exam_category (ec_id_exam ,ec_id_category) VALUES
(1,1),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,2),(9,2),(10,2),(10,2),(11,2),(12,2),(13,2),(14,2),(16,2),(17,2),(18,2),(19,2),(20,2),(21,2),(22,2),(23,2),(24,2),(25,2),(26,2),(27,3),(28,3),(29,3),(30,3),(31,1),(32,1),(33,1),(34,1),(31,28),(32,28),(33,28),(34,28);

CREATE TABLE IF NOT EXISTS invoice (
  invoice_id serial PRIMARY KEY,
  invoice_date DATE,
  invoice_status VARCHAR(255),
  invoice_observation VARCHAR(255),
  invoice_id_patient serial NOT NULL,
  FOREIGN KEY (invoice_id_patient) REFERENCES patient(patient_id)
);

CREATE TABLE IF NOT EXISTS reference (
  ref_id serial PRIMARY KEY ,
  ref_component VARCHAR(255),
  ref_min FLOAT,
  ref_max FLOAT,
  ref_unit VARCHAR(255),
  ref_principal BOOLEAN,
  ref_id_exam serial NOT NULL,
  FOREIGN KEY (ref_id_exam) REFERENCES exam(exam_id)
);

INSERT INTO reference (ref_component,ref_min,ref_max,ref_unit,ref_principal,ref_id_exam) VALUES
('Lymph#',4.0,10.0,'ul',false,1),
('Mid#',0.8,4.0,'ul',false,1),
('Gran#',0.8,4.0,'ul',false,1),
('Lymph%',4.0,10.0,'ul',false,1),
('Mid%',0.8,4.0,'ul',false,1),
('Gran%',0.8,4.0,'ul',false,1),
('HGB',0.8,4.0,'ul',false,1),
('RBC',0.8,4.0,'ul',false,1),
('HCT',0.8,4.0,'ul',false,1),
('MCV',0.8,4.0,'ul',false,1),
('MCH',0.8,4.0,'ul',false,1),
('MCHC',0.8,4.0,'ul',false,1),
('RDW-CV',0.8,4.0,'ul',false,1),
('RDW-SD',0.8,4.0,'ul',false,1),
('PLT',0.8,4.0,'ul',false,1),
('MPV',0.8,4.0,'ul',false,1),
('PDW',0.8,4.0,'ul',false,1),
('PCT',0.8,4.0,'ul',false,1),
('Glicemia',0.8,4.0,'ul',true,6),
('Urea en Suero',0.8,4.0,'ul',true,9),
('Cloro',0.8,4.0,'ul',true,14),
('Grupo Sanguíneo y RH',null,null,null,true,5);

/*('Aspecto',null,null,null,false,34),
('Color Orina',null,null,null,false,34),
('Color Heces',null,null,null,false,41),
('Creatinina en Suero',null,null,null,true,14),
('Acido Urico',null,null,null,true,16),
('Colesterol',null,null,null,true,54); */

CREATE TABLE IF NOT EXISTS result (
  result_id serial PRIMARY KEY ,
  result_value INT,
  result_observer VARCHAR(255),
  result_boolean BOOLEAN,
  result_id_reference serial NOT NULL,
  result_id_invoice serial NOT NULL,
  FOREIGN KEY (result_id_invoice) REFERENCES invoice(invoice_id),
  FOREIGN KEY (result_id_reference) REFERENCES reference(ref_id)
);

CREATE TABLE IF NOT EXISTS invoice_exam(
   invoice_exam_id serial PRIMARY KEY ,
   invoice_exam_id_invoice serial NOT NULL,
   invoice_exam_id_examen serial NOT NULL,
   FOREIGN KEY (invoice_exam_id_invoice) REFERENCES invoice(invoice_id),
   FOREIGN KEY (invoice_exam_id_examen) REFERENCES exam(exam_id)
);