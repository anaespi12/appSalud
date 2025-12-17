-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS appSalud;
USE appSalud;

-- 2. Crear la tabla de pacientes
CREATE TABLE IF NOT EXISTS pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  fechaDeNacimiento DATE NOT NULL
);

-- 3. Crear la tabla de basculas
CREATE TABLE IF NOT EXISTS basculas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  peso FLOAT NOT NULL,
  altura FLOAT NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

-- 4. Insertar el paciente de ejemplo
INSERT INTO pacientes (nombre, apellidos, fechaDeNacimiento)
VALUES ('Pepe', 'Pepito', '1999-11-18');

-- 5. Crear la tabla de termometro
CREATE TABLE IF NOT EXISTS termometro (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  temperatura FLOAT NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

-- 6. Insertar los registros de bascula asociados al paciente
-- Obten el id del paciente recién insertado (asumimos que es 1)
INSERT INTO basculas (paciente_id, peso, altura, fecha)
VALUES
(1, 75.5, 1.60, '2021-10-29'),
(1, 63.45, 1.61, '2021-11-03'),
(1, 61.90, 1.61, '2021-11-11');

-- 7. Insertar registros de termometro para el paciente
INSERT INTO termometro (paciente_id, temperatura, fecha)
VALUES
(1, 37.5, '2021-10-29'),
(1, 36.8, '2021-11-03'),
(1, 37.2, '2021-11-11');
