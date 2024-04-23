-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.16-MariaDB - mariadb.org binary distribution
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
DROP DATABASE IF EXISTS `mors_mutual_insurance`;
CREATE DATABASE IF NOT EXISTS `mors_mutual_insurance` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mors_mutual_insurance`;

-- Volcando estructura para tabla mors_mutual_insurance.aseguradoras
DROP TABLE IF EXISTS `aseguradoras`;
CREATE TABLE IF NOT EXISTS `aseguradoras` (
  `idAseguradora` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `razon_social` varchar(45) DEFAULT NULL,
  `contacto` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `ext` varchar(45) DEFAULT NULL,
  `celular` varchar(45) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`idAseguradora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mors_mutual_insurance.asegurados
DROP TABLE IF EXISTS `asegurados`;
CREATE TABLE IF NOT EXISTS `asegurados` (
  `idAsegurado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idAsegurado`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mors_mutual_insurance.conceptos
DROP TABLE IF EXISTS `conceptos`;
CREATE TABLE IF NOT EXISTS `conceptos` (
  `idConcepto` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  `precio` decimal(10,0) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`idConcepto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mors_mutual_insurance.conceptos_has_cotizaciones
DROP TABLE IF EXISTS `conceptos_has_cotizaciones`;
CREATE TABLE IF NOT EXISTS `conceptos_has_cotizaciones` (
  `idConcepto` int(11) NOT NULL,
  `idCotizacion` int(11) NOT NULL,
  PRIMARY KEY (`idConcepto`,`idCotizacion`),
  KEY `fk_Conceptos_has_Cotizaciones_Cotizaciones1` (`idCotizacion`),
  CONSTRAINT `fk_Conceptos_has_Cotizaciones_Conceptos1` FOREIGN KEY (`idConcepto`) REFERENCES `conceptos` (`idConcepto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Conceptos_has_Cotizaciones_Cotizaciones1` FOREIGN KEY (`idCotizacion`) REFERENCES `cotizaciones` (`idCotizacion`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mors_mutual_insurance.cotizaciones
DROP TABLE IF EXISTS `cotizaciones`;
CREATE TABLE IF NOT EXISTS `cotizaciones` (
  `idCotizacion` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` varchar(45) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `idAsegurado` int(11) NOT NULL,
  `idVehiculo` int(11) NOT NULL,
  `idAseguradora` int(11) NOT NULL,
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
  CONSTRAINT `fk_Cotizaciones_Aseguradoras1` FOREIGN KEY (`idAseguradora`) REFERENCES `aseguradoras` (`idAseguradora`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cotizaciones_Asegurados` FOREIGN KEY (`idAsegurado`) REFERENCES `asegurados` (`idAsegurado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cotizaciones_Vehiculos1` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`idVehiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mors_mutual_insurance.marcas
DROP TABLE IF EXISTS `marcas`;
CREATE TABLE IF NOT EXISTS `marcas` (
  `idMarca` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`idMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mors_mutual_insurance.modelos
DROP TABLE IF EXISTS `modelos`;
CREATE TABLE IF NOT EXISTS `modelos` (
  `idModelo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `idMarca` int(11) NOT NULL,
  PRIMARY KEY (`idModelo`),
  KEY `fk_Modelo_Marca1` (`idMarca`) USING BTREE,
  CONSTRAINT `fk_Modelo_Marca1` FOREIGN KEY (`idMarca`) REFERENCES `marcas` (`idMarca`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mors_mutual_insurance.seguros
DROP TABLE IF EXISTS `seguros`;
CREATE TABLE IF NOT EXISTS `seguros` (
  `idSeguro` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_contratacion` date DEFAULT NULL,
  `fecha_vigencia` date DEFAULT NULL,
  `idCotizacion` int(11) NOT NULL,
  PRIMARY KEY (`idSeguro`),
  KEY `fk_Seguros_Cotizaciones1` (`idCotizacion`),
  CONSTRAINT `fk_Seguros_Cotizaciones1` FOREIGN KEY (`idCotizacion`) REFERENCES `cotizaciones` (`idCotizacion`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mors_mutual_insurance.usuarios
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `idRol` int(11) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`idUsuario`),
  KEY `fk_Usuarios_Usuario_Roles1` (`idRol`),
  CONSTRAINT `fk_Usuarios_Usuario_Roles1` FOREIGN KEY (`idRol`) REFERENCES `usuario_roles` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mors_mutual_insurance.usuario_roles
DROP TABLE IF EXISTS `usuario_roles`;
CREATE TABLE IF NOT EXISTS `usuario_roles` (
  `idRol` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mors_mutual_insurance.vehiculos
DROP TABLE IF EXISTS `vehiculos`;
CREATE TABLE IF NOT EXISTS `vehiculos` (
  `idVehiculo` int(11) NOT NULL AUTO_INCREMENT,
  `anio` varchar(4) DEFAULT NULL,
  `num_serie` varchar(45) DEFAULT NULL,
  `idModelo` int(11) NOT NULL,
  PRIMARY KEY (`idVehiculo`),
  KEY `fk_Vehiculos_Modelo1` (`idModelo`),
  CONSTRAINT `fk_Vehiculos_Modelo1` FOREIGN KEY (`idModelo`) REFERENCES `modelos` (`idModelo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
