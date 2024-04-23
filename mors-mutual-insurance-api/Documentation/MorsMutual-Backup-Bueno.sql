-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para mors_mutual_insurance
CREATE DATABASE IF NOT EXISTS `mors_mutual_insurance` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mors_mutual_insurance`;

-- Volcando estructura para tabla mors_mutual_insurance.aseguradoras
CREATE TABLE IF NOT EXISTS `aseguradoras` (
  `idAseguradora` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `razon_social` varchar(45) DEFAULT NULL,
  `contacto` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `ext` varchar(45) DEFAULT NULL,
  `celular` varchar(45) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idAseguradora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mors_mutual_insurance.aseguradoras: ~0 rows (aproximadamente)
DELETE FROM `aseguradoras`;

-- Volcando estructura para tabla mors_mutual_insurance.asegurados
CREATE TABLE IF NOT EXISTS `asegurados` (
  `idAsegurado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idAsegurado`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mors_mutual_insurance.asegurados: ~0 rows (aproximadamente)
DELETE FROM `asegurados`;

-- Volcando estructura para tabla mors_mutual_insurance.conceptos
CREATE TABLE IF NOT EXISTS `conceptos` (
  `idConcepto` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  `precio` decimal(10,0) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idConcepto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mors_mutual_insurance.conceptos: ~0 rows (aproximadamente)
DELETE FROM `conceptos`;

-- Volcando estructura para tabla mors_mutual_insurance.conceptos_has_cotizaciones
CREATE TABLE IF NOT EXISTS `conceptos_has_cotizaciones` (
  `idConcepto` int NOT NULL,
  `idCotizacion` int NOT NULL,
  PRIMARY KEY (`idConcepto`,`idCotizacion`),
  KEY `fk_Conceptos_has_Cotizaciones_Cotizaciones1` (`idCotizacion`),
  CONSTRAINT `fk_Conceptos_has_Cotizaciones_Conceptos1` FOREIGN KEY (`idConcepto`) REFERENCES `conceptos` (`idConcepto`),
  CONSTRAINT `fk_Conceptos_has_Cotizaciones_Cotizaciones1` FOREIGN KEY (`idCotizacion`) REFERENCES `cotizaciones` (`idCotizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mors_mutual_insurance.conceptos_has_cotizaciones: ~0 rows (aproximadamente)
DELETE FROM `conceptos_has_cotizaciones`;

-- Volcando estructura para tabla mors_mutual_insurance.cotizaciones
CREATE TABLE IF NOT EXISTS `cotizaciones` (
  `idCotizacion` int NOT NULL AUTO_INCREMENT,
  `fecha` varchar(45) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `idAsegurado` int NOT NULL,
  `idVehiculo` int NOT NULL,
  `idAseguradora` int NOT NULL,
  `prima_neta` decimal(10,0) DEFAULT NULL,
  `descuento` decimal(10,0) DEFAULT NULL,
  `prima_modulos` decimal(10,0) DEFAULT NULL,
  `recargo_fraccionamiento` decimal(10,0) DEFAULT NULL,
  `reduccion_autorizada` decimal(10,0) DEFAULT NULL,
  `derecho_poliza` decimal(10,0) DEFAULT NULL,
  `iva` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`idCotizacion`),
  KEY `fk_Cotizaciones_Asegurados` (`idAsegurado`),
  KEY `fk_Cotizaciones_Vehiculos1` (`idVehiculo`),
  KEY `fk_Cotizaciones_Aseguradoras1` (`idAseguradora`),
  CONSTRAINT `fk_Cotizaciones_Aseguradoras1` FOREIGN KEY (`idAseguradora`) REFERENCES `aseguradoras` (`idAseguradora`),
  CONSTRAINT `fk_Cotizaciones_Asegurados` FOREIGN KEY (`idAsegurado`) REFERENCES `asegurados` (`idAsegurado`),
  CONSTRAINT `fk_Cotizaciones_Vehiculos1` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`idVehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mors_mutual_insurance.cotizaciones: ~0 rows (aproximadamente)
DELETE FROM `cotizaciones`;

-- Volcando estructura para tabla mors_mutual_insurance.marcas
CREATE TABLE IF NOT EXISTS `marcas` (
  `idMarca` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mors_mutual_insurance.marcas: ~6 rows (aproximadamente)
DELETE FROM `marcas`;
INSERT INTO `marcas` (`idMarca`, `nombre`, `activo`) VALUES
	(2, 'Toyota', 0),
	(3, 'Kia', 1),
	(4, 'Hyundai', 1),
	(5, 'BYD edit', 1),
	(6, 'Kia', 1),
	(7, 'Mazda', 1);

-- Volcando estructura para tabla mors_mutual_insurance.modelos
CREATE TABLE IF NOT EXISTS `modelos` (
  `idModelo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `idMarca` int NOT NULL,
  PRIMARY KEY (`idModelo`),
  KEY `fk_Modelo_Marca1` (`idMarca`) USING BTREE,
  CONSTRAINT `fk_Modelo_Marca1` FOREIGN KEY (`idMarca`) REFERENCES `marcas` (`idMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mors_mutual_insurance.modelos: ~2 rows (aproximadamente)
DELETE FROM `modelos`;
INSERT INTO `modelos` (`idModelo`, `nombre`, `activo`, `idMarca`) VALUES
	(3, 'K3', 1, 6),
	(4, 'Accent', 1, 4);

-- Volcando estructura para tabla mors_mutual_insurance.seguros
CREATE TABLE IF NOT EXISTS `seguros` (
  `idSeguro` int NOT NULL AUTO_INCREMENT,
  `fecha_contratacion` date DEFAULT NULL,
  `fecha_vigencia` date DEFAULT NULL,
  `idCotizacion` int NOT NULL,
  PRIMARY KEY (`idSeguro`),
  KEY `fk_Seguros_Cotizaciones1` (`idCotizacion`),
  CONSTRAINT `fk_Seguros_Cotizaciones1` FOREIGN KEY (`idCotizacion`) REFERENCES `cotizaciones` (`idCotizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mors_mutual_insurance.seguros: ~0 rows (aproximadamente)
DELETE FROM `seguros`;

-- Volcando estructura para tabla mors_mutual_insurance.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `idRol` int NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idUsuario`),
  KEY `fk_Usuarios_Usuario_Roles1` (`idRol`),
  CONSTRAINT `fk_Usuarios_Usuario_Roles1` FOREIGN KEY (`idRol`) REFERENCES `usuario_roles` (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mors_mutual_insurance.usuarios: ~0 rows (aproximadamente)
DELETE FROM `usuarios`;

-- Volcando estructura para tabla mors_mutual_insurance.usuario_roles
CREATE TABLE IF NOT EXISTS `usuario_roles` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mors_mutual_insurance.usuario_roles: ~0 rows (aproximadamente)
DELETE FROM `usuario_roles`;

-- Volcando estructura para tabla mors_mutual_insurance.vehiculos
CREATE TABLE IF NOT EXISTS `vehiculos` (
  `idVehiculo` int NOT NULL AUTO_INCREMENT,
  `anio` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `num_serie` varchar(45) DEFAULT NULL,
  `idModelo` int NOT NULL,
  PRIMARY KEY (`idVehiculo`),
  KEY `fk_Vehiculos_Modelo1` (`idModelo`),
  CONSTRAINT `fk_Vehiculos_Modelo1` FOREIGN KEY (`idModelo`) REFERENCES `modelos` (`idModelo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla mors_mutual_insurance.vehiculos: ~2 rows (aproximadamente)
DELETE FROM `vehiculos`;
INSERT INTO `vehiculos` (`idVehiculo`, `anio`, `num_serie`, `idModelo`) VALUES
	(1, '2007', 'ASZKT12326-7AX12', 3),
	(2, '2024', 'dsajsakj', 4);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
