-- creacion de databasecoles
-- DROP DATABASE IF EXISTS laboratory;
-- CREATE DATABASE laboratory;
-- USE laboratory;

-- TRUNCATE TABLE role CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS relationship CASCADE;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS exam CASCADE;
DROP TABLE IF EXISTS exam_category CASCADE;
DROP TABLE IF EXISTS lab;

DROP TABLE IF EXISTS patient CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS sub_category;
DROP TABLE IF EXISTS result CASCADE;
DROP TABLE IF EXISTS request;
DROP TABLE IF EXISTS composed;
DROP TABLE IF EXISTS orden CASCADE; 
DROP TABLE IF EXISTS order CASCADE; 
DROP TABLE IF EXISTS order_exam CASCADE;
DROP TABLE IF EXISTS exam_category CASCADE;
DROP TABLE IF EXISTS statu;
DROP TABLE IF EXISTS gender CASCADE;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS users CASCADE;

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
('Centro Medico Ambulatorio San Rafael','J-1234562','Para nosotros no hay nada mas importante que tu salud.','servicio de laboratorio','Somos una empresa que cuenta con personal altamente calificado y que trabaja con altos estándares de calidad y servicio en el área de análisis clínicos. Nuestros pacientes son nuestra razón de ser y es por ello que para satisfacerlos utilizamos tecnología de vanguardia y los más exigentes controles de calidad, para poder brindarles la mayor confiabilidad en sus resultados.','Ofrecer un servicio de Laboratorio Clínico excepcional,  donde nuestros usuarios se sientan satisfechos y plenos por la atención ofrecida en todos nuestros departamentos. Distinguirnos como un laboratorio extraordinario donde la excelencia de nuestros procedimientos y atención  al userse nos distinga.','Posicionarnos como un Laboratorio Clínico innovador y de alta calidad, que ofrezca a sus pacientes soluciones que permitan el preciso diagnóstico médico y oportuno tratamiento. Queremos ser una empresa composederente en el sector salud, que la excelencia sea nuestro estandarte.','lab@gmail.com','Ciudad Guayana 8050, Bolívar. Core 8','0286-9530505','https://lab-san-rafael-api.onrender.com/sources/images/public/logo.png');

CREATE TABLE IF NOT EXISTS role (
    role_id serial PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO role (role_name) VALUES
('manager'),
('admin'),
('bioanalyst'),
('patient'); 



CREATE TABLE IF NOT EXISTS users (
    /* users_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),*/
    users_id serial PRIMARY KEY,
    users_dni VARCHAR(255) UNIQUE NULL,
    users_email VARCHAR(255) NOT NULL UNIQUE,
    users_usersname VARCHAR NOT NULL UNIQUE,
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

--- FOREIGN KEY (users_id_role) REFERENCES role(role_id) ON DELETE SET NULL,

INSERT INTO users (users_dni,users_email,users_usersname,users_password,users_firstname,users_lastname,users_gender,users_address,users_firstphone,users_secondphone,users_birthdate,users_bloodtyping,users_type_relationship,users_name_relationship, users_created,users_abatar,users_id_role) VALUES ('v-1234','michelledellosa7@gmail.com','michelle','12345678','Michelle','Dellza','Femenino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',1),('v-24796','edwin@gmail.com','edwin','1234','edwin','mendez','Masculino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',2),('v-333','bio@gmail.com','bio','33333','Michelle','Dellza','Masculino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',3),('v-4444','patient@gmail.com','patient','44444','Patient','Dellza','Masculino','San Felix','041432','0412','1900-01-01','O+',null,null,now(),'https://lab-san-rafael-api.onrender.com/sources/images/public/default.jpg',4);


/*insert INTO patient (patient_dni,patient_email,patient_firstname,patient_lastname,patient_address,patient_mobilephone,patient_homephone,patient_birthdate,patient_gender,patient_blood_typing,patient_relationship,patient_created,patient_principal,patient_id_users) VALUES 
('j-1234','Michelledellosa7@gmail.com','Michelle','Dellza','San Felix','041432','0412565','1900-01-01','Femenino','o+',1,'1900-01-01',true,1),
('j-24796','edwingc88@gmail.com','Edwin','Mendez','Core 8','041432','0412565','1900-01-01','Masculino','o+',1,'1900-01-01',true,2),
('v-3333','bionalist@gmail.com','nombrebio','apellidobio','Core 8','041432','0412565','1900-01-01','Masculino','o+',1,'1900-01-01',true,3);
*/

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
   exam_reference VARCHAR(255) NULL,
   exam_unit VARCHAR(255) null,
   exam_price FLOAT,
   exam_id_father INT NULL,
   FOREIGN KEY (exam_id_father) REFERENCES exam(exam_id)
);


INSERT INTO exam (exam_id,exam_name,exam_reference,exam_unit,exam_price,exam_id_father) VALUES
(1,'Hematologia Completa',null,null,15,null),
(2,'PT','10-1','md-dl',10,null),
(3,'PTT','10-1','md-dl',15,null),
(4,'VSG','10-1','md-dl',15,null),
(5,'Grupo Sanguíneo y RH',null,null,15,null),
/* (6,'Glicemia','10-1','mg/dl',false,15),
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
(42,'Denge',10,1,'mg/dl',false,3), */
(6,'Orina General',null, null, 10 ,null),
(7,'Heces General',null, null, 5 ,null),
(8,'Lymph#','20-1', 'dl',4, 1),
(9,'A#','20-1', 'dl',3 ,1);


/* CREATE TABLE IF NOT EXISTS exam_category (
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
 */
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

CREATE TABLE IF NOT EXISTS order (
  order_id serial PRIMARY KEY,
  order_number serial PRIMARY KEY,
  order_date DATE,
  order_observation VARCHAR(255),
  order_statu serial,
);

CREATE TABLE IF NOT EXISTS exam_with_order(
   exam_with_order_id serial PRIMARY KEY ,
   exam_with_order_id_exam serial NOT NULL,
   eexam_with_order_id_order serial NOT NULL,
   exam_with_order_id_user serial NOT NULL,  
   FOREIGN KEY (exam_with_order_id_exam) REFERENCES exam(exam_id),
   FOREIGN KEY (exam_with_order_id_order) REFERENCES order(order_id),
   FOREIGN KEY (exam_with_order_id_user) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS invoice(
  invoice_id serial PRIMARY KEY ,
  invoice_total FLOAT,
  invoice_method_payment VARCHAR(255),
  invoice_reference_paymeny VARCHAR(255)
);

/* 
CREATE TABLE IF NOT EXISTS result (
  result_id serial PRIMARY KEY ,
  result_value INT,
  result_boolean BOOLEAN,
  result_observer VARCHAR(255),
  result_id_composed serial NOT NULL,
  result_id_order serial NOT NULL,
  FOREIGN KEY (result_id_order) REFERENCES order(order_id),
  FOREIGN KEY (result_id_composed) REFERENCES composed(composed_id)
); */