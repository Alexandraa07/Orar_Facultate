-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               12.3.2-MariaDB - MariaDB Server
-- Server OS:                    Win64
-- HeidiSQL Version:             12.17.0.7270
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for adservio
CREATE DATABASE IF NOT EXISTS `adservio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `adservio`;

-- Dumping structure for table adservio.activity
CREATE TABLE IF NOT EXISTS `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `activity_type` enum('lecture','seminar','laboratory') DEFAULT NULL,
  `week` varchar(255) DEFAULT NULL,
  `professor_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `professor_id` (`professor_id`),
  KEY `course_id` (`course_id`),
  KEY `group_id` (`group_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `1` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`),
  CONSTRAINT `2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `3` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`),
  CONSTRAINT `4` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table adservio.activity: ~8 rows (approximately)
INSERT INTO `activity` (`id`, `start_time`, `end_time`, `day`, `activity_type`, `week`, `professor_id`, `course_id`, `group_id`, `room_id`) VALUES
	(1, '08:00:00', '10:00:00', 'Luni', 'lecture', 'toate', 1, 1, 1, 1),
	(2, '10:00:00', '12:00:00', 'Luni', 'laboratory', 'para', 4, 1, 1, 2),
	(3, '10:00:00', '12:00:00', 'Marti', 'laboratory', 'impara', 4, 1, 2, 3),
	(4, '12:00:00', '14:00:00', 'Marti', 'lecture', 'toate', 2, 2, 1, 1),
	(5, '08:00:00', '10:00:00', 'Miercuri', 'seminar', 'toate', 3, 2, 1, 4),
	(6, '14:00:00', '16:00:00', 'Joi', 'lecture', 'toate', 1, 3, 2, 1),
	(7, '16:00:00', '18:00:00', 'Joi', 'laboratory', 'para', 4, 3, 3, 3),
	(8, '08:00:00', '10:00:00', 'Vineri', 'lecture', 'toate', 2, 4, 3, 1);

-- Dumping structure for table adservio.course
CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `credits` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `abbreviation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table adservio.course: ~5 rows (approximately)
INSERT INTO `course` (`id`, `name`, `credits`, `year`, `semester`, `abbreviation`) VALUES
	(1, 'Structuri de Date si Algoritmi', 6, 2, 1, 'SDA'),
	(2, 'Baze de Date', 5, 2, 1, 'BD'),
	(3, 'Programare Orientata pe Obiecte', 6, 2, 1, 'POO'),
	(4, 'Retele de Calculatoare', 5, 2, 2, 'RC'),
	(5, 'Sisteme de Operare', 6, 2, 2, 'SO');

-- Dumping structure for table adservio.group
CREATE TABLE IF NOT EXISTS `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table adservio.group: ~3 rows (approximately)
INSERT INTO `group` (`id`, `group_name`) VALUES
	(1, '30421'),
	(2, '30422'),
	(3, '30431');

-- Dumping structure for table adservio.person
CREATE TABLE IF NOT EXISTS `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `personal_id` varchar(255) DEFAULT NULL,
  `father_initial` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKn0i6d7rc1hqkjivk494g8j2qd` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table adservio.person: ~14 rows (approximately)
INSERT INTO `person` (`id`, `last_name`, `first_name`, `personal_id`, `father_initial`, `password`, `role`, `username`) VALUES
	(1, 'Popescu', 'Andrei', '5030101123456', 'M', '$2b$10$.q5N7mTMrLI.6Tu8tSkCjuIcTO0PvV4.lT6YOHQTKp7FwSJKFcpfy', 'STUDENT', 'student1'),
	(2, 'Ionescu', 'Maria', '6040203234567', 'V', '$2b$10$.q5N7mTMrLI.6Tu8tSkCjuIcTO0PvV4.lT6YOHQTKp7FwSJKFcpfy', 'STUDENT', 'student2'),
	(3, 'Georgescu', 'Ana', '5100415345678', 'D', '$2b$10$.q5N7mTMrLI.6Tu8tSkCjuIcTO0PvV4.lT6YOHQTKp7FwSJKFcpfy', 'STUDENT', 'student3'),
	(4, 'Dumitrescu', 'Mihai', '5990627456789', 'I', '$2b$10$.q5N7mTMrLI.6Tu8tSkCjuIcTO0PvV4.lT6YOHQTKp7FwSJKFcpfy', 'STUDENT', 'student4'),
	(5, 'Stan', 'Elena', '6050718567890', 'C', '$2b$10$.q5N7mTMrLI.6Tu8tSkCjuIcTO0PvV4.lT6YOHQTKp7FwSJKFcpfy', 'STUDENT', 'student5'),
	(6, 'Radu', 'George', '5991205678901', 'A', '$2b$10$.q5N7mTMrLI.6Tu8tSkCjuIcTO0PvV4.lT6YOHQTKp7FwSJKFcpfy', 'STUDENT', 'student6'),
	(7, 'Marin', 'Ioana', '6031122789012', 'T', '$2b$10$.q5N7mTMrLI.6Tu8tSkCjuIcTO0PvV4.lT6YOHQTKp7FwSJKFcpfy', 'STUDENT', 'student7'),
	(8, 'Constantin', 'Vlad', '5981009890123', 'P', '$2b$10$.q5N7mTMrLI.6Tu8tSkCjuIcTO0PvV4.lT6YOHQTKp7FwSJKFcpfy', 'STUDENT', 'student8'),
	(9, 'Vasilescu', 'Cristian', '1650312123123', 'N', '$2b$10$Au2sqGTpZH0tgaSjYDVktOVOqjz2UuObr5utlZXOPqein2iKe.rPS', 'PROFESSOR', 'professor1'),
	(10, 'Dinu', 'Alexandra', '2700815234234', 'S', '$2b$10$Au2sqGTpZH0tgaSjYDVktOVOqjz2UuObr5utlZXOPqein2iKe.rPS', 'PROFESSOR', 'professor2'),
	(11, 'Munteanu', 'Bogdan', '1750602345345', 'R', '$2b$10$Au2sqGTpZH0tgaSjYDVktOVOqjz2UuObr5utlZXOPqein2iKe.rPS', 'PROFESSOR', 'professor3'),
	(12, 'Tudor', 'Simona', '2800921456456', 'G', '$2b$10$Au2sqGTpZH0tgaSjYDVktOVOqjz2UuObr5utlZXOPqein2iKe.rPS', 'PROFESSOR', 'professor4'),
	(13, NULL, NULL, NULL, NULL, '$2a$10$4t4WJ.cRs6BZs77brBCcwOm5lxBODfk9bP4jKvwqYUhYBIy8XfMMm', 'MANAGER', 'admin'),
	(14, NULL, NULL, NULL, NULL, '$2a$10$dlC5qjrWTvkUkGA3Qas5YefoFzhkrs3Iwo2mqeWnxhdnzMH0nrJ2u', 'MANAGER', 'admin2');

-- Dumping structure for table adservio.professor
CREATE TABLE IF NOT EXISTS `professor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` enum('professor','associate_professor','lecturer','phd_assistant') DEFAULT NULL,
  `abbreviation` varchar(255) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table adservio.professor: ~4 rows (approximately)
INSERT INTO `professor` (`id`, `status`, `abbreviation`, `person_id`) VALUES
	(1, 'professor', 'prof.dr.ing.', 9),
	(2, 'associate_professor', 'conf.dr.inf.', 10),
	(3, 'lecturer', 'sef lucr.dr.', 11),
	(4, 'phd_assistant', 'asist.drd.', 12);

-- Dumping structure for table adservio.room
CREATE TABLE IF NOT EXISTS `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `building` varchar(255) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `seat_count` int(11) DEFAULT NULL,
  `room_type` enum('laboratory','seminar_room','lecture_hall') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table adservio.room: ~4 rows (approximately)
INSERT INTO `room` (`id`, `name`, `building`, `floor`, `seat_count`, `room_type`) VALUES
	(1, 'A1', 'Corp A', 1, 120, 'lecture_hall'),
	(2, 'L204', 'Corp L', 2, 30, 'laboratory'),
	(3, 'L205', 'Corp L', 2, 30, 'laboratory'),
	(4, 'S301', 'Corp S', 3, 40, 'seminar_room');

-- Dumping structure for table adservio.schedule
CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `academic_year` varchar(255) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table adservio.schedule: ~2 rows (approximately)
INSERT INTO `schedule` (`id`, `name`, `academic_year`, `semester`) VALUES
	(1, 'Orar Semestrul 1', '2025-2026', 1),
	(2, 'Orar Semestrul 2', '2025-2026', 2);

-- Dumping structure for table adservio.schedule_activity
CREATE TABLE IF NOT EXISTS `schedule_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule_id` int(11) DEFAULT NULL,
  `activity_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `schedule_id` (`schedule_id`),
  KEY `activity_id` (`activity_id`),
  CONSTRAINT `1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`),
  CONSTRAINT `2` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table adservio.schedule_activity: ~8 rows (approximately)
INSERT INTO `schedule_activity` (`id`, `schedule_id`, `activity_id`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 1, 3),
	(4, 1, 4),
	(5, 1, 5),
	(6, 2, 6),
	(7, 2, 7),
	(8, 2, 8);

-- Dumping structure for table adservio.student
CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_number` int(11) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  CONSTRAINT `2` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table adservio.student: ~8 rows (approximately)
INSERT INTO `student` (`id`, `student_number`, `person_id`, `group_id`) VALUES
	(1, 202401, 1, 1),
	(2, 202402, 2, 1),
	(3, 202403, 3, 1),
	(4, 202404, 4, 2),
	(5, 202405, 5, 2),
	(6, 202406, 6, 3),
	(7, 202407, 7, 3),
	(8, 202408, 8, 3);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
