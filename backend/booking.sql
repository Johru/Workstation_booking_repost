CREATE DATABASE booking;
USE booking;

CREATE TABLE `User` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`user_name` varchar(255) NOT NULL,
	`user_login` varchar(255) NOT NULL,
	`user_password` varchar(255) NOT NULL,
	`user_email` varchar(255) NOT NULL,
	`user_isadmin` BIT NOT NULL DEFAULT 0,
    `user_isblocked` BIT NOT NULL DEFAULT 0,
	PRIMARY KEY (`user_id`)
);

select * from floor;

CREATE TABLE `Building` (
	`building_id` INT NOT NULL AUTO_INCREMENT,
	`building_name` varchar(255) NOT NULL,
	`building_address` varchar(255) NOT NULL,
	`building_country`  varchar(255) NOT NULL,
	`building_zip`  varchar(10) NOT NULL,
	`building_city`  varchar(255) NOT NULL,
	`building_image`  varchar(255) NOT NULL,
	PRIMARY KEY (`building_id`)
);

CREATE TABLE `Seat` (
	`seat_id` INT NOT NULL AUTO_INCREMENT,
	`workstation_id` INT NOT NULL   ,
	PRIMARY KEY (`seat_id`)

);

CREATE TABLE `Floor` (
	`building_id` INT NOT NULL,
	`floor_id` INT NOT NULL AUTO_INCREMENT,
	`floor_name` varchar(255) NOT NULL,
	`floor_capacity` INT NOT NULL,
	`floor_plan` varchar(255) NOT NULL,
	PRIMARY KEY (`floor_id`)
);

CREATE TABLE `Workstation` (
    `workstation_id` INT NOT NULL AUTO_INCREMENT,
    `floor_id` INT NOT NULL,
    `workstation_name` VARCHAR(255) NOT NULL,
    `workstation_isactive` BIT NOT NULL DEFAULT 1,
    PRIMARY KEY (`workstation_id`)
);

CREATE TABLE `Reservation` (
	`reservation_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`seat_id` INT NOT NULL,
	`reservation_date` DATE NOT NULL
);

ALTER TABLE `Seat` ADD CONSTRAINT `Seat_fk0` FOREIGN KEY (`workstation_id`) REFERENCES `Workstation`(`workstation_id`);

ALTER TABLE `Floor` ADD CONSTRAINT `Floor_fk0` FOREIGN KEY (`building_id`) REFERENCES `Building`(`building_id`);

ALTER TABLE `Workstation` ADD CONSTRAINT `Workstation_fk0` FOREIGN KEY (`floor_id`) REFERENCES `Floor`(`floor_id`);

ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_fk0` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`);

ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_fk1` FOREIGN KEY (`seat_id`) REFERENCES `Seat`(`seat_id`);












