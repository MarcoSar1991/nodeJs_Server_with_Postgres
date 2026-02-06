const homepageModel = require('../models/homepageModel');
const homepageService = require('../services/homepageDataService');

const getHomepageData = async (request, response) => {
  try {
    const baseData = await homepageService.loadHomepageBaseData();

    response.status(200).render('index', {
      ...baseData,
      ricercaFatta: false,
      title: 'Homepage'
    });
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nel recupero dati Homepage');
  }
}

const insertAssociazione = async (request, response) => {
  const { corso_id, ateneo_id } = request.body;

  try {
    await homepageModel.insertAssociazione(corso_id, ateneo_id);
    response.redirect('/');
  } catch (error) {
    const baseData = await homepageService.loadHomepageBaseData();

    let alertMessage = 'Errore durante l’associazione';

    if (error.code === '23505') {
      alertMessage = 'Associazione già esistente';
    }

    response.status(200).render('index', {
      ...baseData,
      ricercaFatta: false,
      alertMessage,
      title: 'Homepage'
    });

  }
}

const getCorsiAtenei = async (request, response) => {
  try {
    const params = request.query;
    const id_corso = parseInt(params.id_corso) || null;
    const id_tipologia = parseInt(params.id_tipologia) || null;
    const baseData = await homepageService.loadHomepageBaseData();
    const result = await homepageModel.getCorsiAtenei(id_corso, id_tipologia);
    response.status(200).render('index', {
      ...baseData,
      ricercaFatta: true,
      risultati: result.rows,
      title: 'Homepage'
    })
  } catch (error) {
    console.error(error);
    response.status(500).send('Errore nel recupero delle associazioni corso-ateneo');
  }
}

module.exports = {
  getHomepageData,
  insertAssociazione,
  getCorsiAtenei
}
