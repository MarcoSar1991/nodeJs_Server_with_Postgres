const tipologieModel = require('../models/tipologieModel.js');

const getAllTipologie = async (request, response) => {
  try {
    const results = await tipologieModel.getAllTipologie();
    response.status(200).render('tipologie',
      {
        tipologie: results.rows,
        title: 'Tipologie' }
    );
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nel recupero delle tipologie');
  }
}

const getTipologia = async (request, response) => {
  const id = request.params.id;
  try {
    const results = await tipologieModel.getTipologiaById(id);
    if (!results.rows[0]) {
      return response.status(404).send('Tipologia non trovata');
    }
    response.status(200).render('tipologie-edit', { tipologia: results.rows[0], title: 'Modifica Tipologia' });
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nel recupero della tipologia');
  }
}

const insertTipologia = async (request, response) => {
  const { nome } = request.body;
  try {
    await tipologieModel.insertTipologia(nome);
    response.redirect('/tipologie');
  } catch (error) {
    console.error(error);
    let alertMessage = 'Errore nell’inserimento della tipologia';

    if (error.code === '23505') {
      alertMessage = 'Tipologia già esistente';
    }

    const results = await tipologieModel.getAllTipologie();
    response.status(200).render('tipologie', {
      tipologie: results.rows,
      alertMessage,
      title: 'Tipologie'
    });
  }
}

const updateTipologia = async (request, response) => {
  const id = request.params.id;
  const { nome } = request.body;
  try {
    await tipologieModel.updateTipologiaById(id, nome);
    response.redirect('/tipologie');
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nell\'aggiornamento della tipologia');
  }
}

const deleteTipologia = async (request, response) => {
  const id = request.params.id;
  try {
    await tipologieModel.deleteTipologiaById(id);
    response.redirect('/tipologie');
  } catch (error) {
    console.error(error);
    let alertMessage = 'Errore nella cancellazione della tipologia';

    if (error.code === '23503') {
      alertMessage = 'Impossibile eliminare la tipologia: è associata ad uno o più corsi';
    }

    const results = await tipologieModel.getAllTipologie();
    response.status(200).render('tipologie', {
      tipologie: results.rows,
      alertMessage,
      title: 'Tipologie'
    });
  }
}

module.exports = {
  getAllTipologie,
  getTipologia,
  insertTipologia,
  updateTipologia,
  deleteTipologia
};
