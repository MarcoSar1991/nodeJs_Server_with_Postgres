const corsiModel = require('../models/corsiModel');
const tipologieModel = require('../models/tipologieModel');

const getAllCorsi = async (request, response) => {
  try {
    const corsiResult = await corsiModel.getAllCorsi();
    const tipologieResult = await tipologieModel.getAllTipologie();

    response.status(200).render('corsi', {
      corsi: corsiResult.rows,
      tipologie: tipologieResult.rows,
      title: 'Corsi'
    });

  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nel recupero dei corsi');
  }
}

const getCorso = async (request, response) => {
  const id = request.params.id;
  try {
    const results = await corsiModel.getCorsoById(id);
    if (!results.rows[0]) {
      return response.status(404).send('Corso non trovato');
    }
    response.status(200).render('corsi-edit', { corso: results.rows[0], title: 'Modifica Corso' });
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nel recupero del corso');
  }
}

const insertCorso = async (request, response) => {
  const { nome, tipologia_id } = request.body;

  try {
    await corsiModel.insertCorso(nome, tipologia_id);
    response.redirect('/corsi');
  } catch (error) {
    console.error(error);
    let alertMessage = 'Errore nell\'inserimento del corso';

    if (error.code === '23505') {
      alertMessage = 'Esiste già un corso con questo nome per la tipologia selezionata';
    }

    if (error.code === '23503') {
      alertMessage = 'Tipologia non valida';
    }

    const corsiResult = await corsiModel.getAllCorsi();
    const tipologieResult = await tipologieModel.getAllTipologie();

    response.status(400).render('corsi', {
      corsi: corsiResult.rows,
      tipologie: tipologieResult.rows,
      alertMessage,
      title: 'Corsi'
    });
  }
}

const updateCorso = async (request, response) => {
  const id = request.params.id;
  const { nome } = request.body;
  try {
    await corsiModel.updateCorsoById(id, nome);
    response.redirect('/corsi');
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nell\'aggiornamento del corso');
  }
}

const deleteCorso = async (request, response) => {
  const id = request.params.id;
  try {
    await corsiModel.deleteCorsoById(id);
    response.redirect('/corsi');
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nella cancellazione del corso');
  }
}

module.exports = {
  getAllCorsi,
  getCorso,
  insertCorso,
  updateCorso,
  deleteCorso
};
