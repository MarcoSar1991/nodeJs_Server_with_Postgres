const pool = require('../config/db.js');

const insertAssociazione = (corso_id, ateneo_id) => {
  return pool.query('INSERT INTO corsi_atenei (corso_id, ateneo_id) VALUES ($1,$2)', [corso_id, ateneo_id]);
}

const getCorsiAtenei = (id_corso, id_tipologia) => {
  return pool.query(`SELECT 
      corsi.nome as Nome_Corso,
      tipologie.nome as Nome_Tipologia,
      atenei.nome as Nome_Ateneo
    FROM corsi
    INNER JOIN tipologie ON tipologie.id = corsi.tipologia_id
    LEFT JOIN corsi_atenei ON corsi_atenei.corso_id = corsi.id
    LEFT JOIN atenei ON atenei.id = corsi_atenei.ateneo_id
    WHERE ($1::int IS NULL OR corsi.id = $1) AND ($2::int IS NULL OR tipologie.id = $2)
    ORDER BY Nome_Tipologia ASC`, [id_corso, id_tipologia]
  );
}

module.exports = {
  insertAssociazione,
  getCorsiAtenei
};
