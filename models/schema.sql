DROP DATABASE IF EXISTS ks41eh1eo6bajxow;
CREATE DATABASE ks41eh1eo6bajxow;
USE ks41eh1eo6bajxow;

CREATE TABLE `players` (
  `player_id` int NOT NULL AUTO_INCREMENT,
  `player_name` varchar(50),
  `jersey_number` varchar(2),
  `position` varchar(3),
  `handness` varchar(5),
  `team_id` int,
  PRIMARY KEY (`player_id`),
  KEY `FK` (`position`, `team_id`)
);
CREATE TABLE `teams` (
  `team_id` int NOT NULL AUTO_INCREMENT,
  `team_name` varchar(50),
  PRIMARY KEY (`team_id`)
);
CREATE TABLE `season_bat_stats` (
  `player_id` int,
  `hits` int,
  `at_bats` int,
  KEY `FK` (`player_id`)
);
CREATE TABLE `matches` (
  `match_id` int NOT NULL AUTO_INCREMENT,
  `home_id` int,
  `away_id` int,
  `home_score` int,
  `away_score` int,
  
  PRIMARY KEY (`match_id`),
  KEY `FK` (`home_id`, `away_id`)
);
CREATE TABLE `at_bats` (
  `at_bats_id` int NOT NULL AUTO_INCREMENT,
  `match_id` int,
  `batter_id` int,
  `hit` char(1),
  PRIMARY KEY (`at_bats_id`),
  KEY `FK` (`match_id`, `batter_id`)
);
