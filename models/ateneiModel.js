const pool = require('../config/db.js');

const getAllAtenei = () => {
  return pool.query('SELECT * FROM atenei ORDER BY id ASC');
}

const getAteneoById = (id) => {
  return pool.query('SELECT * FROM atenei WHERE id = $1', [id]);
}

const insertAteneo = (nome) => {
  return pool.query('INSERT INTO atenei (nome) VALUES ($1) RETURNING *', [nome]);
}

const updateAteneoById = (id, nome) => {
  return pool.query('UPDATE atenei SET nome = $1 WHERE id = $2', [nome, id]);
}

const deleteAteneoById = (id) => {
  return pool.query('DELETE FROM atenei WHERE id = $1', [id]);
}

module.exports = {
  getAllAtenei,
  getAteneoById,
  insertAteneo,
  updateAteneoById,
  deleteAteneoById
};
