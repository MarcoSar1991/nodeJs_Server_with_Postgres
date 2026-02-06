INSERT INTO tipologie (nome)
VALUES ('Laurea Triennale'),
       ('Laurea Magistrale'),
       ('Master'),
       ('Corso Professionalizzante');

INSERT INTO corsi (nome, tipologia_id)
VALUES ('Informatica', 1),
       ('Ingegneria Informatica', 1),
       ('Data Science', 2),
       ('Cybersecurity', 2),
       ('Machine Learning', 3),
       ('Web Development', 4);

INSERT INTO atenei (nome)
VALUES ('Università di Milano'),
       ('Politecnico di Torino'),
       ('Università di Bologna'),
       ('Sapienza Università di Roma'),
       ('Università di Napoli Federico II');

INSERT INTO corsi_atenei (corso_id, ateneo_id)
VALUES (1, 1),
       (1, 3),
       (2, 2),
       (2, 4),
       (3, 1),
       (3, 2),
       (3, 3),
       (4, 2),
       (4, 5),
       (5, 1),
       (5, 3),
       (6, 4),
       (6, 5);
