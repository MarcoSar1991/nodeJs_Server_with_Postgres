const pool = require('../config/db.js');

const getAllTipologie = () => {
  return pool.query('SELECT * FROM tipologie ORDER BY id ASC');
}

const getTipologiaById = (id) => {
  return pool.query('SELECT * FROM tipologie WHERE id = $1', [id]);
}

const insertTipologia = (nome) => {
  return pool.query('INSERT INTO tipologie (nome) VALUES ($1) RETURNING *', [nome]);
}

const updateTipologiaById = (id, nome) => {
  return pool.query('UPDATE tipologie SET nome = $1 WHERE id = $2', [nome, id]);
}

const deleteTipologiaById = (id) => {
  return pool.query('DELETE FROM tipologie WHERE id = $1', [id]);
}

module.exports = {
  getAllTipologie,
  getTipologiaById,
  insertTipologia,
  updateTipologiaById,
  deleteTipologiaById
};
