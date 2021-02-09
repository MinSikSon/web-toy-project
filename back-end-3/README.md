# mysql query
```sql
SHOW DATABASES;

CREATE DATABASE opentutorials;

USE opentutorials;

SHOW TABLES;

CREATE TABLE `topic` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(30) NOT NULL,
    `description` text,
    `created` datetime NOT NULL,
    `author_id` int(11) DEFAULT NULL,
    PRIMARY KEY(`id`)
    );

SELECT * FROM topic;

SHOW FULL COLUMNS FROM topic;
```