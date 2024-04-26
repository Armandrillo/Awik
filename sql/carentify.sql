-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 26, 2024 at 01:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carentify`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `accountId` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `firstName` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `password` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`accountId`, `email`, `firstName`, `lastName`, `password`) VALUES
(9, '123@gmail.com', 'Jake', 'Doe', '$2b$10$3UpIg0vBOI81UHlw7FXz.eDMoLjsmrb/URO/vvSiVaNE5A5.p9IK.'),
(15, '12345@gmail.com', 'George', 'Newman', '$2b$10$dNDcqVCMxGKKiObGZU58HOcuBqlcUnyuwtPaJuSv4LaQgBAwyULha'),
(16, 'weljohn2003@mgail.com', 'weljohn123', 'weljohn123', '$2b$10$gCOQe.OI2PYSM.4BVPk87eLlVdkqFTbMLYmq67sKajbuC6lg2PmSK'),
(17, '12345@gmail.com', '12345', '12345', '$2b$10$9RuYGRaAVHLqYImLXpTjGuFDrtvzoC3am/rVX0qnBtoCbGtXM58uO');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `contactNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `driverId` int(11) NOT NULL,
  `empId` int(11) NOT NULL,
  `licenseNo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`driverId`, `empId`, `licenseNo`) VALUES
(3, 9, 123456789),
(4, 10, 987654321);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employeeId` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `position` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employeeId`, `accountId`, `position`) VALUES
(9, 15, 'Driver'),
(10, 9, 'Driver');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `orderId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `packageId` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `status` enum('Incoming','Paid','Canceled','Refunded') NOT NULL,
  `carId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderreceipt`
--

CREATE TABLE `orderreceipt` (
  `receiptId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `receiptDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `packageId` int(11) NOT NULL,
  `packageType` enum('Basic','Semi-Premium','Premium','Custom') NOT NULL,
  `rentalHrs` int(11) NOT NULL,
  `pax` int(11) NOT NULL,
  `destination` varchar(500) NOT NULL,
  `pickUpLocation` varchar(500) NOT NULL,
  `moreDetails` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `carId` int(11) NOT NULL,
  `driverId` int(11) NOT NULL,
  `plateNo` int(11) NOT NULL,
  `carType` enum('Sedan','Van') NOT NULL,
  `brand` varchar(30) NOT NULL,
  `color` varchar(30) NOT NULL,
  `vehiclePax` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`carId`, `driverId`, `plateNo`, `carType`, `brand`, `color`, `vehiclePax`) VALUES
(1, 2, 5551, 'Van', 'Honda', 'Violet', 6),
(2, 3, 1002, 'Van', 'Ford', 'Blue', 8),
(3, 3, 1003, 'Sedan', 'Chevrolet', 'Green', 5),
(4, 3, 1004, 'Van', 'Honda', 'Black', 7),
(5, 4, 1005, 'Sedan', 'Nissan', 'Yellow', 5),
(6, 4, 1006, 'Van', 'Kia', 'Orange', 8),
(7, 4, 1007, 'Sedan', 'Hyundai', 'Pink', 4),
(8, 4, 1008, 'Van', 'Mercedes', 'Purple', 7),
(9, 2, 12345, 'Sedan', 'Tesla', 'Blue', 4),
(10, 4, 4312, 'Sedan', 'Minecraft', 'Red', 4),
(11, 2, 6612, 'Sedan', 'Valorant', 'Indigo', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accountId`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customerId`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`driverId`),
  ADD KEY `FK_employee` (`empId`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employeeId`),
  ADD KEY `FK_account` (`accountId`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `FK_customer` (`customerId`),
  ADD KEY `FK_package` (`packageId`),
  ADD KEY `FK_vehicle` (`carId`);

--
-- Indexes for table `orderreceipt`
--
ALTER TABLE `orderreceipt`
  ADD PRIMARY KEY (`receiptId`),
  ADD KEY `FK_orderdetail` (`orderId`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`packageId`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`carId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `accountId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `driverId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderreceipt`
--
ALTER TABLE `orderreceipt`
  MODIFY `receiptId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `packageId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `carId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `driver`
--
ALTER TABLE `driver`
  ADD CONSTRAINT `FK_employee` FOREIGN KEY (`empId`) REFERENCES `employee` (`employeeId`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `FK_account` FOREIGN KEY (`accountId`) REFERENCES `account` (`accountId`);

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `FK_customer` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`),
  ADD CONSTRAINT `FK_package` FOREIGN KEY (`packageId`) REFERENCES `package` (`packageId`),
  ADD CONSTRAINT `FK_vehicle` FOREIGN KEY (`carId`) REFERENCES `vehicle` (`carId`);

--
-- Constraints for table `orderreceipt`
--
ALTER TABLE `orderreceipt`
  ADD CONSTRAINT `FK_orderdetail` FOREIGN KEY (`orderId`) REFERENCES `orderdetail` (`orderId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
