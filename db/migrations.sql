CREATE TABLE tipologie
(
    id   SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE corsi
(
    id           SERIAL PRIMARY KEY,
    nome         VARCHAR(150) NOT NULL,
    tipologia_id INTEGER      NOT NULL,
    CONSTRAINT fk_corsi_tipologie FOREIGN KEY (tipologia_id) REFERENCES tipologie (id) ON DELETE RESTRICT,
    CONSTRAINT unique_nome_tipologia UNIQUE (nome, tipologia_id)
);

CREATE TABLE atenei
(
    id   SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE corsi_atenei
(
    corso_id  INTEGER NOT NULL,
    ateneo_id INTEGER NOT NULL,
    PRIMARY KEY (corso_id, ateneo_id),
    CONSTRAINT fk_corso FOREIGN KEY (corso_id) REFERENCES corsi (id) ON DELETE CASCADE,
    CONSTRAINT fk_ateneo FOREIGN KEY (ateneo_id) REFERENCES atenei (id) ON DELETE CASCADE
);
