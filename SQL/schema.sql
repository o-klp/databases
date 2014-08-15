CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  /* Describe your table here.*/
  UserID int NOT NULL AUTO_INCREMENT,
  UserName varchar(20) NOT NULL UNIQUE,
  PRIMARY KEY(UserID)
);

CREATE TABLE rooms (
  /* Describe your table here.*/
  Roomname varchar(20) NOT NULL UNIQUE,
  PRIMARY KEY(Roomname)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  MessageID int NOT NULL AUTO_INCREMENT,
  UserID int NOT NULL,
  Roomname varchar(20) NOT NULL,
  MessageText blob NOT NULL,
  PRIMARY KEY(MessageID),
  FOREIGN KEY(UserID) REFERENCES users(UserID),
  FOREIGN KEY(Roomname) REFERENCES rooms(Roomname)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




