const ateneoModel = require('../models/ateneiModel');

const getAllAtenei = async (request, response) => {
  try {
    const results = await ateneoModel.getAllAtenei();
    response.status(200).render('atenei', { atenei: results.rows, title: 'Atenei' });
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nel recupero degli atenei');
  }
}

const getAteneo = async (request, response) => {
  const id = request.params.id;
  try {
    const results = await ateneoModel.getAteneoById(id);
    if (!results.rows[0]) {
      return response.status(404).send('Ateneo non trovato');
    }
    response.status(200).render('atenei-edit', { ateneo: results.rows[0], title: 'Modifica Ateneo' });
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nel recupero dell\'ateneo');
  }
}

const insertAteneo = async (request, response) => {
  const { nome } = request.body;
  try {
    await ateneoModel.insertAteneo(nome);
    response.redirect('/atenei');
  } catch (error) {
    console.error(error);
    let alertMessage = 'Errore nell\'inserimento dell\'ateneo';

    if (error.code === '23505') {
      alertMessage = 'Esiste già un ateneo con questo nome';
    }

    const results = await ateneoModel.getAllAtenei();

    response.status(400).render('atenei', {
      atenei: results.rows,
      alertMessage,
      title: 'Atenei'
    });
  }
}

const updateAteneo = async (request, response) => {
  const id = request.params.id;
  const { nome } = request.body;
  try {
    await ateneoModel.updateAteneoById(id, nome);
    response.redirect('/atenei');
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nell\'aggiornamento dell\'ateneo');
  }
}

const deleteAteneo = async (request, response) => {
  const id = request.params.id;
  try {
    await ateneoModel.deleteAteneoById(id);
    response.redirect('/atenei');
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nella cancellazione dell\'ateneo');
  }
}

module.exports = {
  getAllAtenei,
  insertAteneo,
  deleteAteneo,
  updateAteneo,
  getAteneo
};
