CREATE DATABASE Flash_Card;

USE Flash_Card;

CREATE TABLE basic_flash_cards (
  id INT NOT NULL AUTO_INCREMENT,
  front VARCHAR(255) NOT NULL,
  back VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE cloze_flash_cards (
  id INT NOT NULL AUTO_INCREMENT,
  full_text VARCHAR(255) NOT NULL,
  cloze VARCHAR(100) NOT NULL,
  partial_text VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO basic_flash_cards (front, back)
VALUES ("Who was the first president of the United States", "George Washington");

INSERT INTO basic_flash_cards (front, back)
VALUES ("Who was the second president of the United States", "John Adams");

INSERT INTO cloze_flash_cards (full_text, cloze, partial_text)
VALUES ("Franky, my dear, I don't give a damn", "my dear", "Franky, ..., I don't give a damn");

INSERT INTO cloze_flash_cards (full_text, cloze, partial_text)
VALUES ("I'm gonna make him an offer he can't refuse.", "offer", "I'm gonna make him an ... he can't refuse.");