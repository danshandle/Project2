DROP DATABASE IF EXISTS baseballdb;
CREATE DATABASE baseballdb;

USE baseballdb;

CREATE TABLE `players` (
  `player_id` int,
  `player_name` varchar(50),
  `jersey_number` varchar(2),
  `position` varchar(3),
  `handness_bat` varchar(5),
  `team_id` int,
  PRIMARY KEY (`player_id`),
  KEY `FK` (`position`, `team_id`)
);
CREATE TABLE `teams` (
  `team_id` int,
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
  `match_id` int,
  `home` int,
  `away` int,
  `location` varchar(50),
  `date` datetime,
  `result` char(1),
  PRIMARY KEY (`match_id`),
  KEY `FK` (`home`, `away`)
);
CREATE TABLE `at_bats` (
  `at_bats_id` int,
  `match_id` int,
  `batter_id` int,
  `hit` char(1),
  PRIMARY KEY (`at_bats_id`),
  KEY `FK` (`match_id`, `batter_id`)
);