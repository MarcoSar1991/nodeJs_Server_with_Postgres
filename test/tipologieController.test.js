const sinon = require('sinon');
const { expect } = require('chai');

const tipologieModel = require('../models/tipologieModel');
const tipologieController = require('../controllers/tipologieController');

function createResponse() {
  return {
    status: sinon.stub().returnsThis(),
    render: sinon.stub().returnsThis(),
    send: sinon.stub().returnsThis(),
    redirect: sinon.stub().returnsThis()
  };
}

describe('tipologieController', () => {
  afterEach(() => sinon.restore());

  describe('getAllTipologie', () => {
    it('dovrebbe renderizzare la view con la lista di tipologie', async () => {
      const fake = [{ id: 1, nome: 'T' }];
      sinon.stub(tipologieModel, 'getAllTipologie').resolves({ rows: fake });
      const req = {};
      const res = createResponse();

      await tipologieController.getAllTipologie(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.render.calledOnce).to.be.true;
    });
  });

  describe('getTipologia', () => {
    it('render edit se esiste', async () => {
      const fake = { id: 1, nome: 'T' };
      sinon.stub(tipologieModel, 'getTipologiaById').resolves({ rows: [fake] });
      const req = { params: { id: '1' } };
      const res = createResponse();

      await tipologieController.getTipologia(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.render.calledOnce).to.be.true;
    });

    it('404 se non trovata', async () => {
      sinon.stub(tipologieModel, 'getTipologiaById').resolves({ rows: [] });
      const req = { params: { id: '99' } };
      const res = createResponse();

      await tipologieController.getTipologia(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });
  });

  describe('insertTipologia', () => {
    it('redirect /tipologie se ok', async () => {
      sinon.stub(tipologieModel, 'insertTipologia').resolves();
      const req = { body: { nome: 'Nuova' } };
      const res = createResponse();

      await tipologieController.insertTipologia(req, res);

      expect(res.redirect.calledWith('/tipologie')).to.be.true;
    });

    it('gestisce duplicato e renderizza con alert', async () => {
      const err = new Error('dup'); err.code = '23505';
      sinon.stub(tipologieModel, 'insertTipologia').rejects(err);
      const fake = [{ id: 1 }];
      sinon.stub(tipologieModel, 'getAllTipologie').resolves({ rows: fake });
      const req = { body: { nome: 'X' } };
      const res = createResponse();

      await tipologieController.insertTipologia(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      const renderArgs = res.render.firstCall.args[1];
      expect(renderArgs.alertMessage).to.equal('Tipologia già esistente');
    });
  });

  describe('updateTipologia', () => {
    it('redirect /tipologie se ok', async () => {
      sinon.stub(tipologieModel, 'updateTipologiaById').resolves();
      const req = { params: { id: '1' }, body: { nome: 'N' } };
      const res = createResponse();

      await tipologieController.updateTipologia(req, res);

      expect(res.redirect.calledWith('/tipologie')).to.be.true;
    });
  });

  describe('deleteTipologia', () => {
    it('redirect /tipologie se ok', async () => {
      sinon.stub(tipologieModel, 'deleteTipologiaById').resolves();
      const req = { params: { id: '1' } };
      const res = createResponse();

      await tipologieController.deleteTipologia(req, res);

      expect(res.redirect.calledWith('/tipologie')).to.be.true;
    });

    it('gestisce fk constraint 23503 e mostra alert', async () => {
      const err = new Error('fk'); err.code = '23503';
      sinon.stub(tipologieModel, 'deleteTipologiaById').rejects(err);
      const fake = [{ id: 1 }];
      sinon.stub(tipologieModel, 'getAllTipologie').resolves({ rows: fake });
      const req = { params: { id: '1' } };
      const res = createResponse();

      await tipologieController.deleteTipologia(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      const args = res.render.firstCall.args[1];
      expect(args.alertMessage).to.be.a('string');
      expect(args.tipologie).to.equal(fake);
    });
  });
});

