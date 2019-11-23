-- phpMyAdmin SQL Dump
-- version 4.4.15.1
-- http://www.phpmyadmin.net
--
-- Host: mysql669.umbler.com
-- Generation Time: Nov 23, 2019 at 04:29 PM
-- Server version: 5.6.40
-- PHP Version: 5.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ajudaae`
--

-- --------------------------------------------------------

--
-- Table structure for table `pedido`
--

CREATE TABLE IF NOT EXISTS `pedido` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `motivo` varchar(2000) DEFAULT NULL,
  `descricao` varchar(2000) DEFAULT NULL,
  `user` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pedido`
--

INSERT INTO `pedido` (`id`, `nome`, `motivo`, `descricao`, `user`) VALUES
(2, 'Fogão', 'pq eu to com fome', 'cooktop né', 22),
(3, 'TV', 'pq tenho que fazer alguma coisa', 'tem que ser smart', 22);

-- --------------------------------------------------------

--
-- Table structure for table `produto`
--

CREATE TABLE IF NOT EXISTS `produto` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(2000) DEFAULT NULL,
  `img` varchar(100) DEFAULT NULL,
  `user` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `produto`
--

INSERT INTO `produto` (`id`, `nome`, `descricao`, `img`, `user`) VALUES
(5, 'TV LCD', 'TVZinha vagabunda, mas funciona', NULL, 23),
(6, 'Cooktop', 'Cooktop top', NULL, 23);

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `nome`) VALUES
(2, 'Culinária'),
(1, 'Eletrodoméstico'),
(4, 'Limpeza'),
(3, 'Móvel'),
(5, 'Utensilhos');

-- --------------------------------------------------------

--
-- Table structure for table `tagpedido`
--

CREATE TABLE IF NOT EXISTS `tagpedido` (
  `idtag` int(11) NOT NULL,
  `iditem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tagpedido`
--

INSERT INTO `tagpedido` (`idtag`, `iditem`) VALUES
(1, 2),
(2, 2),
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tagproduto`
--

CREATE TABLE IF NOT EXISTS `tagproduto` (
  `idtag` int(11) NOT NULL,
  `iditem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tagproduto`
--

INSERT INTO `tagproduto` (`idtag`, `iditem`) VALUES
(1, 5),
(2, 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(140) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `doador` int(11) NOT NULL,
  `endereco` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `doador`, `endereco`) VALUES
(22, 'Thiago', 'sha512:yFhgxfgcCjlBS+f43ni4JPcc+hPylRQEVpyMnawOFvk=:MjT94lYOXZv8b15GRKexY7uxeEIERkHyQnKLBfBRl3SpZpNcBgD73GWJr5yEWftuyDcoMsGP1H5HiwRoWy6awQ==', 'thiagofnsc@outlook.com', 2, 'Rua Servidão das Flores, 89, Apto 1102'),
(23, 'Palmer', 'sha512:Kb6JfJf4W70tOrocpZo5UAH4l7gRYoPhNgXTBpyAOl8=:ILwREu3u6jUJ9R6Vhm0UAxc1oDzzZYrc85VeLJWztK9/5QmFSD0fB+r9P8ZNEOEsJQDzY7X8Ihb6UtzkmuS2cg==', 'palmer@tech.com', 1, 'Rua Fim do Mundo, 22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requester` (`user`);

--
-- Indexes for table `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Indexes for table `tagpedido`
--
ALTER TABLE `tagpedido`
  ADD PRIMARY KEY (`idtag`,`iditem`),
  ADD KEY `idpedido` (`iditem`);

--
-- Indexes for table `tagproduto`
--
ALTER TABLE `tagproduto`
  ADD PRIMARY KEY (`idtag`,`iditem`),
  ADD KEY `idproduto` (`iditem`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `produto`
--
ALTER TABLE `produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Constraints for table `tagpedido`
--
ALTER TABLE `tagpedido`
  ADD CONSTRAINT `tagpedido_ibfk_1` FOREIGN KEY (`idtag`) REFERENCES `tag` (`id`),
  ADD CONSTRAINT `tagpedido_ibfk_2` FOREIGN KEY (`iditem`) REFERENCES `pedido` (`id`);

--
-- Constraints for table `tagproduto`
--
ALTER TABLE `tagproduto`
  ADD CONSTRAINT `tagproduto_ibfk_1` FOREIGN KEY (`idtag`) REFERENCES `tag` (`id`),
  ADD CONSTRAINT `tagproduto_ibfk_2` FOREIGN KEY (`iditem`) REFERENCES `produto` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
