const corsiModel = require('../models/corsiModel');
const ateneiModel = require('../models/ateneiModel');
const tipologieModel = require('../models/tipologieModel');

const loadHomepageBaseData = async () => {
  const [corsi, atenei, tipologie] = await Promise.all([
    corsiModel.getAllCorsi(),
    ateneiModel.getAllAtenei(),
    tipologieModel.getAllTipologie()
  ]);

  return {
    corsi: corsi.rows,
    atenei: atenei.rows,
    tipologie: tipologie.rows
  };
};

module.exports = {
  loadHomepageBaseData
};
