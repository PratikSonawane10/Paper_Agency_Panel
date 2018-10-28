-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2018 at 07:36 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paper_agency`
--

-- --------------------------------------------------------

--
-- Table structure for table `areadetails`
--

CREATE TABLE `areadetails` (
  `areaId` int(11) NOT NULL,
  `areaName` varchar(500) NOT NULL,
  `entryDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `areadetails`
--

INSERT INTO `areadetails` (`areaId`, `areaName`, `entryDate`) VALUES
(2, 'Gandhi Nagar', '2018-03-17 00:14:06'),
(3, 'shivaji park', '2018-03-17 23:19:13'),
(4, 'Mothi Holi', '2018-03-17 23:19:27'),
(5, 'S T Colony', '2018-03-17 23:19:41');

-- --------------------------------------------------------

--
-- Table structure for table `paperdetails`
--

CREATE TABLE `paperdetails` (
  `paperId` int(11) NOT NULL,
  `paperName` varchar(500) NOT NULL,
  `paperPrice` varchar(500) NOT NULL,
  `entryDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paperdetails`
--

INSERT INTO `paperdetails` (`paperId`, `paperName`, `paperPrice`, `entryDate`) VALUES
(1, 'Mata', '8', '2018-03-17 00:23:26'),
(2, 'Mumbai Mirro', '5', '2018-03-17 23:16:55'),
(4, 'Punya Nagari', '10', '2018-03-17 23:17:52'),
(6, 'Times Of India', '5', '2018-03-21 16:55:22'),
(7, 'Sakali', '3', '2018-03-21 17:26:13'),
(8, 'Nav Bharat', '15', '2018-03-21 17:27:47');

-- --------------------------------------------------------

--
-- Table structure for table `userbill`
--

CREATE TABLE `userbill` (
  `billId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `paperName` varchar(500) NOT NULL,
  `paperPrice` varchar(500) NOT NULL,
  `monthName` varchar(500) NOT NULL,
  `year` varchar(500) NOT NULL,
  `noOfDays` int(11) NOT NULL,
  `deliveryCharges` int(11) NOT NULL,
  `monthlyBill` varchar(500) NOT NULL,
  `currentMonthBill` varchar(500) NOT NULL,
  `prevBalance` int(11) NOT NULL,
  `totalBillWithPrevBalance` int(11) NOT NULL,
  `paid` varchar(500) NOT NULL,
  `balance` varchar(500) NOT NULL,
  `entryDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userbill`
--

INSERT INTO `userbill` (`billId`, `userId`, `paperName`, `paperPrice`, `monthName`, `year`, `noOfDays`, `deliveryCharges`, `monthlyBill`, `currentMonthBill`, `prevBalance`, `totalBillWithPrevBalance`, `paid`, `balance`, `entryDate`) VALUES
(3, 2, 'Mata', '8', 'February', '2018', 31, 10, '248', '258', 0, 258, '108', '100', '2018-04-08 14:15:13'),
(4, 2, 'Mata', '8', 'March', '2018', 31, 10, '248', '258', 100, 358, '', '', '2018-04-08 14:56:05'),
(5, 13, 'Nav Bharat', '15', 'March', '2018', 31, 10, '465', '475', 0, 475, '', '', '2018-04-18 23:13:13');

-- --------------------------------------------------------

--
-- Table structure for table `userdetails`
--

CREATE TABLE `userdetails` (
  `userId` int(11) NOT NULL,
  `userName` varchar(500) NOT NULL,
  `userMobileNo` varchar(50) NOT NULL,
  `userAddress` varchar(10000) NOT NULL,
  `areaId` int(11) NOT NULL,
  `areaName` varchar(500) NOT NULL,
  `city` varchar(500) NOT NULL,
  `paperId` int(11) NOT NULL,
  `paperName` varchar(500) NOT NULL,
  `userEntryDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userdetails`
--

INSERT INTO `userdetails` (`userId`, `userName`, `userMobileNo`, `userAddress`, `areaId`, `areaName`, `city`, `paperId`, `paperName`, `userEntryDate`) VALUES
(2, 'sanket Dhotre', '7896541302', 'RmNo 1 asah park', 2, 'Gandhi Nagar', 'Dombivli', 1, 'Mata', '2018-03-17 23:09:10'),
(3, 'Pratik Sonawnae ', '8655883062', 'D11 narayan smruti', 2, 'Gandhi Nagar', 'Dombivli', 2, 'Mumbai Mirro', '2018-03-17 23:11:55'),
(5, 'ram maurya', '9874563210', 'f1 kulthe nivas', 3, 'Holar Wada', 'Dombivli', 3, 'Punya Nagari', '2018-03-17 23:14:44'),
(7, 'kunal Sonawnae ', '324563211', 'talwade', 5, 'S T Colony', 'Ngn', 2, 'Mumbai Mirro', '2018-03-18 14:20:23'),
(10, 'rushi kolekar', '8082080820', 'gajanan krupa', 3, 'Holar Wada', 'NGN', 6, 'Times Of India', '2018-03-21 17:49:21'),
(11, 'amit kokare', '987456654', 'pratiksha apt', 5, 'S T Colony', 'NGN', 4, 'Punya Nagari', '2018-03-21 17:52:47'),
(12, 'VINAY KUMAR', '3214569871', 'GANDHI CHAUK', 2, 'Gandhi Nagar', 'NGN', 8, 'Nav Bharat', '2018-03-29 10:54:09'),
(13, 'DHIRAJ UTTAM CHANDANI', '8149335303', 'HANUMAN NAGAR  MALEGAON  RAOD', 3, 'Gandhi Nagar', 'NANDGAON', 8, 'Nav Bharat', '2018-03-29 11:13:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `areadetails`
--
ALTER TABLE `areadetails`
  ADD PRIMARY KEY (`areaId`);

--
-- Indexes for table `paperdetails`
--
ALTER TABLE `paperdetails`
  ADD PRIMARY KEY (`paperId`);

--
-- Indexes for table `userbill`
--
ALTER TABLE `userbill`
  ADD PRIMARY KEY (`billId`);

--
-- Indexes for table `userdetails`
--
ALTER TABLE `userdetails`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `areadetails`
--
ALTER TABLE `areadetails`
  MODIFY `areaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `paperdetails`
--
ALTER TABLE `paperdetails`
  MODIFY `paperId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `userbill`
--
ALTER TABLE `userbill`
  MODIFY `billId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `userdetails`
--
ALTER TABLE `userdetails`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
