const pool = require('../config/db.js');

const getAllCorsi = () => {
  return pool.query('SELECT corsi.id, corsi.nome, tipologie.nome as tipologia_corso FROM corsi INNER JOIN tipologie ON tipologie.id = corsi.tipologia_id ORDER BY corsi.id ASC');
}

const getCorsoById = (id) => {
  return pool.query('SELECT * FROM corsi WHERE id = $1', [id]);
}

const insertCorso = (nome, tipologia_id) => {
  return pool.query(
    'INSERT INTO corsi (nome, tipologia_id) VALUES ($1, $2)',
    [nome, tipologia_id]
  );
}

const updateCorsoById = (id, nome) => {
  return pool.query('UPDATE corsi SET nome = $1 WHERE id = $2', [nome, id]);
}

const deleteCorsoById = (id) => {
  return pool.query('DELETE FROM corsi WHERE id = $1', [id]);
}

module.exports = {
  getAllCorsi,
  getCorsoById,
  insertCorso,
  updateCorsoById,
  deleteCorsoById
};
