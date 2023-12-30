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
DROP TABLE IF EXISTS exam_category CASCADE;
DROP TABLE IF EXISTS lab;
DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS patient CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS sub_category;
DROP TABLE IF EXISTS result CASCADE;
DROP TABLE IF EXISTS request;
DROP TABLE IF EXISTS composed; 
DROP TABLE IF EXISTS orden CASCADE; 
DROP TABLE IF EXISTS orden_exam CASCADE;
DROP TABLE IF EXISTS exam_category CASCADE;
DROP TABLE IF EXISTS statu;

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
    /*client_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),*/
    client_id serial PRIMARY KEY,
    client_dni VARCHAR(255) UNIQUE,
    client_email VARCHAR(255) NOT NULL UNIQUE, 
    client_password VARCHAR(255) NULL,
    client_firstname VARCHAR(255) NOT NULL,
    client_lastname VARCHAR(255) NOT NULL,
    client_address VARCHAR(255) ,
    client_mobilephone VARCHAR(255) NOT NULL,
    client_created DATE,
    client_abatar VARCHAR(255),
    client_id_role INT NOT NULL,
    FOREIGN KEY (client_id_role) REFERENCES role(role_id)
);


INSERT INTO client (client_dni,client_email,client_password,client_firstname,client_lastname,client_address,client_mobilePhone, client_created,client_abatar,client_id_role) VALUES ('j-1234','admin@gmail.com','1234','edwin','mendez','core 8','041432','1900-01-01','https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',1);


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
    patient_id_client serial NOT NULL,
    FOREIGN KEY (patient_id_client) REFERENCES client(client_id)
);

insert INTO patient (patient_dni,patient_email,patient_firstname,patient_lastname,patient_address,patient_mobilephone,patient_homephone,patient_birthdate,patient_gender,patient_blood_typing,patient_relationship,patient_created,patient_principal,patient_id_client) VALUES ('j-1234','edwingc88@gmail.com','edwin','mendez','core 8','041432','0412565','1900-01-01','masculino','o+','No aplica','1900-01-01',true,1);

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
('Centro Medico Ambulatorio San Rafael','J-1234562','Para nosotros no hay nada mas importante que tu salud.','servicio de laboratorio','Somos una empresa que cuenta con personal altamente calificado y que trabaja con altos estándares de calidad y servicio en el área de análisis clínicos. Nuestros pacientes son nuestra razón de ser y es por ello que para satisfacerlos utilizamos tecnología de vanguardia y los más exigentes controles de calidad, para poder brindarles la mayor confiabilidad en sus resultados.','Ofrecer un servicio de Laboratorio Clínico excepcional,  donde nuestros usuarios se sientan satisfechos y plenos por la atención ofrecida en todos nuestros departamentos. Distinguirnos como un laboratorio extraordinario donde la excelencia de nuestros procedimientos y atención  al cliente nos distinga.','Posicionarnos como un Laboratorio Clínico innovador y de alta calidad, que ofrezca a sus pacientes soluciones que permitan el preciso diagnóstico médico y oportuno tratamiento. Queremos ser una empresa composederente en el sector salud, que la excelencia sea nuestro estandarte.','email','core 8','02864566','https://lab-san-rafael-api.onrender.com/sources/images/public/logo.jpeg');

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
   category_name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO category (category_id,category_name) VALUES
(1,'HEMATOLOGÍA BIOQUÍMICA SANGUÍNEA'),
(2,'HEMOSTASIA Y TROMBOSIS'),
(3,'ENDOCRINO - METABÓLICO'),
(4,'UROLOGIA - NEFROLOGIA'),
(5,'HECES'),
(6,'MARCADORES TUMORALES'),
(7,'INMUNO - DIAGNÓSTICO'),
(8,'BIOLOGÍA MOLECULAR'),
(9,'MICROBIOLOGÍA'),
(10,'INFECCIOSAS'),
(11,'PERFIL LES DIAGNÓSTICO'),
(12,'PERFIL LES SEGUIMIENTO'),
(13,'PERFIL LES ANTIFOSFOLÍPIDOS'),
(14,'PERFIL ABORTO ESPONTÁNEO'),
(15,'PERFIL LÚPIDO (IL/LAC)'),
(16,'PERFIL ARTRITIS'),
(17,'PERFIL ANCA'),
(18,'PERFIL ENFERMEDAD CELÍACA'),
(19,'PERFIL HEPÁTICO AUTOINMUNE'),
(20,'PERFIL GLOMERULONEFRITIS'),
(21,'PERFIL ESCLERODERMIA'),
(22,'PERFIL TIROIDEO AUTOINMINE'),
(23,'PERFIL SJOGREN'),
(24,'PERFIL ENF.INFLAM.INSTESTINAL-CROHN'),
(25,'PERFIL ALERGIAS'),
(26,'PERFIL LIPIDO'),
(27,'INFECTOCONTAGIOZA'),
(28,'VIRUS');


CREATE TABLE IF NOT EXISTS exam (
   exam_id serial PRIMARY KEY ,
   exam_name VARCHAR(255) NOT NULL,
   exam_min FLOAT,
   exam_max FLOAT,
   exam_unit VARCHAR(255) null,
   exam_composed BOOLEAN,
   exam_price FLOAT null
);


INSERT INTO exam (exam_id,exam_name,exam_min,exam_max,exam_unit,exam_composed,exam_price) VALUES
(1,'Hematologia Completa',null,null,null,true,20),
(2,'PT',10,1,'md-dl',false,15),
(3,'PTT',10,1,'md-dl',false,15),
(4,'VSG',10,1,'md-dl',false,15),
(5,'Grupo Sanguíneo y RH',10,1,'md-dl',false,15),
(6,'Glicemia',10,1,'mg/dl',false,15),
(7,'Glicemia Basal y Postprandial',10,1,'mg/dl',false,15),
(8,'Urea en Suero',10,1,'mg/dl',false,15),
(9,'Creatinina en Suero',10,1,'mg/dl',false,15),
(10,'Acido Urico',10,1,'mg/dl',false,15),
(11,'Cloro',10,1,'mg/dl',false,15),
(12,'Calcio Sérico',10,1,'mg/dl',false,15),
(13,'Fósforo Sérico',10,1,'mg/dl',false,15),
(14,'Magnesio Sérico',10,1,'mg/dl',false,15),
(15,'VDRL',10,1,'mg/dl',false,15),
(16,'HIV Tipo 1 y 2',10,1,'mg/dl',false,15),
(17,'Magnesio Sérico',10,1,'mg/dl',false,15),
(18,'Potasio Sérico',10,1,'mg/dl',false,15),
(19,'Proteinas Totales y fraccionadas',10,1,'mg/dl',false,3),
(20,'PCR Proteina C reactiva',10,1,'mg/dl',false,15),
(21,'TGO Aminotransferasa',10,1,'mg/dl',false,15),
(22,'TGP Aminotransferasa',10,1,'mg/dl',false,15),
(23,'TP. Tiempo de protrombina',10,1,'mg/dl',false,15),
(24,'TTPa. Tiempo de Tromboplastina parcial activada',10,1,'mg/dl',false,15),
(25,'Triglicéridos',10,1,'mg/dl',false,15),
(26,'Colesterol Total',10,1,'mg/dl',false,15),
(27,'HDL',10,1,'mg/dl',false,15),
(28,'LDL',10,1,'mg/dl',false,15),
(29,'VLDL',10,1,'mg/dl',false,15), 
(30,'TSH (Estimulante de Tiroides)',10,1,'mg/dl',false,9),
(31,'T3. Libre ',10,1,'mg/dl',false,9),
(32,'T4 Libre',10,1,'mg/dl',false,9),
(33,'H. Folico Estimulante (FSH)',10,1,'mg/dl',false,9),
(34,'Antic. Anti-Nucleares(cel Hep2) Dil: 1/140-1/160',10,1,'mg/dl',false,3),
(35,'Factor Reumatoide (RA Test)',10,1,'mg/dl',false,3),
(36,'CH50',10,1,'mg/dl',false,3),
(37,'Antic. Anti-Peptido Citrulinado Ciclico',10,1,'mg/dl',false,3),
(38,'Beta-hCG',10,1,'mg/dl',false,3 ),
(39,'Toxoplasma IgM',10,1,'mg/dl',false,3),
(40,'Toxoplamsa Igm',10,1,'mg/dl',false,3),
(41,'Helicobacter pylori',10,1,'mg/dl',false,3),
(42,'Denge',10,1,'mg/dl',false,3),
(43,'Orina General',null, null, null ,true,1),
(44,'Heces General',null, null, null ,true,1);


CREATE TABLE IF NOT EXISTS exam_category (
   exam_category_id serial PRIMARY KEY ,
   exam_category_id_exam serial NOT NULL,
   exam_category_id_category serial NOT NULL,
   FOREIGN KEY (exam_category_id_exam) REFERENCES exam(exam_id) ON DELETE CASCADE,
   FOREIGN KEY (exam_category_id_category) REFERENCES category(category_id) ON DELETE CASCADE
);

INSERT INTO exam_category  (exam_category_id_exam ,exam_category_id_category) VALUES
(1,1),(2,1),(3,1),(4,1),(4,16),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,2),(24,2),(25,26),(26,26),(27,26),(28,26),(29,26),(30,3),(31,3),(32,3),(33,3),(34,16),(34,7),(35,16),(36,16),(37,7),(37,16),(38,7),(39,7),(40,7),(41,8),(42,27),(43,4),(44,5);


CREATE TABLE IF NOT EXISTS composed (
  composed_id serial PRIMARY KEY ,
  composed_name VARCHAR(255),
  composed_min FLOAT,
  composed_max FLOAT,
  composed_unit VARCHAR(255),
  composed_id_exam serial NOT NULL,
  FOREIGN KEY (composed_id_exam) REFERENCES exam(exam_id)
);

INSERT INTO composed (composed_name,composed_max,composed_min,composed_unit,composed_id_exam) VALUES
('Lymph#',4.0,10.0,'ul',1),
('Mid#',0.8,4.0,'ul',1),
('Gran#',0.8,4.0,'ul',1),
('Lymph%',4.0,10.0,'ul',1),
('Mid%',0.8,4.0,'ul',1),
('Gran%',0.8,4.0,'ul',1),
('HGB',0.8,4.0,'ul',1),
('RBC',0.8,4.0,'ul',1),
('HCT',0.8,4.0,'ul',1),
('MCV',0.8,4.0,'ul',1),
('MCH',0.8,4.0,'ul',1),
('MCHC',0.8,4.0,'ul',1),
('RDW-CV',0.8,4.0,'ul',1),
('RDW-SD',0.8,4.0,'ul',1),
('PLT',0.8,4.0,'ul',1),
('MPV',0.8,4.0,'ul',1),
('PDW',0.8,4.0,'ul',1),
('PCT',0.8,4.0,'ul',1),
('ASPECTO ORINA',null,null,null,43),
('COLOR ORINA',null,null,null,43),
('REACCION ORINA',null,null,null,43),
('DENSIDAD ORINA',null,null,null,43),
('LEUCOCITOS ORINA', null,null,null,43),
('CELULAS EPITELIALES ORINA', null,null,null,43),
('BACTERIAS ORINA',null,null,null,43),
('ASPECTO HECES',null,null,null,44),
('COLOR HECES',null, null,null,44),
('SANGRE HECES',null,null,null,44),
('MOCO',null,null,null,44),
('REACCION',null,null,null,44),
('SANGRE OCULTA',null,null,null,44),
('CUERPOS REDUCT', null,null,null,44),
('ASCARIS',null,null,null,44),
('PREQUISTE', null, null, null, 44),
('QUISTE', null, null, null, 44),
('METAQUISTE', null, null, null, 44);

CREATE TABLE IF NOT EXISTS statu(
   statu_id serial PRIMARY KEY,
   statu_name VARCHAR(255),
   statu_description VARCHAR(255)
);

INSERT INTO statu (statu_name,statu_description) VALUES
('PENDIENTE','PENDIENTE'),
('PAGADO','PAGADO'),
('ANULADO','ANULADO'),
('MUESTRA TOMADA', 'MUESTRA TOMADA'),
('ANALISIS REALIZADO', 'ANALISIS REALIZADO'),
('ANALISIS VERIFICADO', 'ANALISIS VERIFICADO'),
('RESULTADO ENTREGADO', 'RESULTADO ENTREGADO');

CREATE TABLE IF NOT EXISTS orden (
  orden_id serial PRIMARY KEY,
  orden_date DATE,
  orden_observation VARCHAR(255),
  orden_id_patient serial NOT NULL,
  orden_statu serial,
  FOREIGN KEY (orden_id_patient) REFERENCES patient(patient_id),
  FOREIGN KEY (orden_statu) REFERENCES statu(statu_id)
);

CREATE TABLE IF NOT EXISTS exam_orden(
   exam_orden_id serial PRIMARY KEY ,
   exam_orden_id_exam serial NOT NULL,
   exam_orden_id_orden serial NOT NULL,
   exam_orden_price FLOAT,   
   FOREIGN KEY (exam_orden_id_exam) REFERENCES exam(exam_id),
   FOREIGN KEY (exam_orden_id_orden) REFERENCES orden(orden_id)
);

CREATE TABLE IF NOT EXISTS invoice(
  invoice_id serial PRIMARY KEY ,
  invoice_total FLOAT,
  invoice_method_payment VARCHAR(255),
  invoice_reference_paymeny VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS result (
  result_id serial PRIMARY KEY ,
  result_value INT,
  result_boolean BOOLEAN,
  result_observer VARCHAR(255),
  result_id_composed serial NOT NULL,
  result_id_orden serial NOT NULL,
  FOREIGN KEY (result_id_orden) REFERENCES orden(orden_id),
  FOREIGN KEY (result_id_composed) REFERENCES composed(composed_id)
);