const sinon = require('sinon');
const { expect } = require('chai');

const homepageModel = require('../models/homepageModel');
const homepageController = require('../controllers/homepageController');
const homepageService = require('../services/homepageDataService');

function createResponse() {
  return {
    status: sinon.stub().returnsThis(),
    render: sinon.stub().returnsThis(),
    send: sinon.stub().returnsThis(),
    redirect: sinon.stub().returnsThis()
  };
}

describe('homepageController', () => {
  afterEach(() => sinon.restore());

  describe('getHomepageData', () => {
    it('dovrebbe renderizzare index con baseData', async () => {
      const baseData = { tipologie: [], corsi: [], atenei: [] };
      sinon.stub(homepageService, 'loadHomepageBaseData').resolves(baseData);

      const req = {};
      const res = createResponse();

      await homepageController.getHomepageData(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.render.calledOnce).to.be.true;
      const args = res.render.firstCall.args[1];
      expect(args.ricercaFatta).to.be.false;
    });
  });

  describe('insertAssociazione', () => {
    it('dovrebbe redirect / se ok', async () => {
      sinon.stub(homepageModel, 'insertAssociazione').resolves();
      const req = { body: { corso_id: '1', ateneo_id: '2' } };
      const res = createResponse();

      await homepageController.insertAssociazione(req, res);

      expect(res.redirect.calledWith('/')).to.be.true;
    });

    it('gestisce errore duplicato e renderizza con alert', async () => {
      const err = new Error('dup'); err.code = '23505';
      sinon.stub(homepageModel, 'insertAssociazione').rejects(err);
      const baseData = { tipologie: [], corsi: [], atenei: [] };
      sinon.stub(homepageService, 'loadHomepageBaseData').resolves(baseData);

      const req = { body: { corso_id: '1', ateneo_id: '2' } };
      const res = createResponse();

      await homepageController.insertAssociazione(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      const args = res.render.firstCall.args[1];
      expect(args.alertMessage).to.equal('Associazione già esistente');
    });
  });

  describe('getCorsiAtenei', () => {
    it('dovrebbe renderizzare i risultati quando ok', async () => {
      const baseData = { tipologie: [], corsi: [], atenei: [] };
      sinon.stub(homepageService, 'loadHomepageBaseData').resolves(baseData);
      const fakeResults = [{ ateneo: 'A' }];
      sinon.stub(homepageModel, 'getCorsiAtenei').resolves({ rows: fakeResults });

      const req = { query: { id_corso: '1', id_tipologia: '2' } };
      const res = createResponse();

      await homepageController.getCorsiAtenei(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      const args = res.render.firstCall.args[1];
      expect(args.ricercaFatta).to.be.true;
      expect(args.risultati).to.equal(fakeResults);
    });
  });
});

