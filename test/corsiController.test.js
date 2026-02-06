const sinon = require('sinon');
const { expect } = require('chai');

const corsiModel = require('../models/corsiModel');
const tipologieModel = require('../models/tipologieModel');
const corsiController = require('../controllers/corsiController');

function createResponse() {
  return {
    status: sinon.stub().returnsThis(),
    render: sinon.stub().returnsThis(),
    send: sinon.stub().returnsThis(),
    redirect: sinon.stub().returnsThis()
  };
}

describe('corsiController', () => {
  afterEach(() => sinon.restore());

  describe('getAllCorsi', () => {
    it('dovrebbe renderizzare la view con corsi e tipologie', async () => {
      const fakeCorsi = [{ id: 1, nome: 'C1' }];
      const fakeTip = [{ id: 10, nome: 'T1' }];
      sinon.stub(corsiModel, 'getAllCorsi').resolves({ rows: fakeCorsi });
      sinon.stub(tipologieModel, 'getAllTipologie').resolves({ rows: fakeTip });

      const req = {};
      const res = createResponse();

      await corsiController.getAllCorsi(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.render.calledOnce).to.be.true;
      const args = res.render.firstCall.args[1];
      expect(args).to.have.property('corsi').that.equals(fakeCorsi);
      expect(args).to.have.property('tipologie').that.equals(fakeTip);
    });
  });

  describe('getCorso', () => {
    it('dovrebbe renderizzare edit quando esiste', async () => {
      const fake = { id: 1, nome: 'Corso' };
      sinon.stub(corsiModel, 'getCorsoById').resolves({ rows: [fake] });

      const req = { params: { id: '1' } };
      const res = createResponse();

      await corsiController.getCorso(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.render.calledOnce).to.be.true;
      expect(res.render.firstCall.args[0]).to.equal('corsi-edit');
    });

    it('dovrebbe rispondere 404 se non trovato', async () => {
      sinon.stub(corsiModel, 'getCorsoById').resolves({ rows: [] });
      const req = { params: { id: '99' } };
      const res = createResponse();

      await corsiController.getCorso(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.send.calledOnce).to.be.true;
    });
  });

  describe('insertCorso', () => {
    it('dovrebbe redirect /corsi se ok', async () => {
      sinon.stub(corsiModel, 'insertCorso').resolves();
      const req = { body: { nome: 'X', tipologia_id: '1' } };
      const res = createResponse();

      await corsiController.insertCorso(req, res);

      expect(res.redirect.calledWith('/corsi')).to.be.true;
    });

    it('gestisce errore 23505 e mostra alert specifico', async () => {
      const err = new Error('dup'); err.code = '23505';
      sinon.stub(corsiModel, 'insertCorso').rejects(err);
      const fakeCorsi = [{ id: 1 }];
      const fakeTip = [{ id: 2 }];
      sinon.stub(corsiModel, 'getAllCorsi').resolves({ rows: fakeCorsi });
      sinon.stub(tipologieModel, 'getAllTipologie').resolves({ rows: fakeTip });

      const req = { body: { nome: 'X', tipologia_id: '1' } };
      const res = createResponse();

      await corsiController.insertCorso(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      const renderArgs = res.render.firstCall.args[1];
      expect(renderArgs).to.have.property('alertMessage').that.is.a('string');
      expect(renderArgs).to.have.property('corsi').that.equals(fakeCorsi);
      expect(renderArgs).to.have.property('tipologie').that.equals(fakeTip);
    });

    it('gestisce errore 23503 (fk) e mostra alert Tipologia non valida', async () => {
      const err = new Error('fk'); err.code = '23503';
      sinon.stub(corsiModel, 'insertCorso').rejects(err);
      const fakeCorsi = [{ id: 1 }];
      const fakeTip = [{ id: 2 }];
      sinon.stub(corsiModel, 'getAllCorsi').resolves({ rows: fakeCorsi });
      sinon.stub(tipologieModel, 'getAllTipologie').resolves({ rows: fakeTip });

      const req = { body: { nome: 'X', tipologia_id: '999' } };
      const res = createResponse();

      await corsiController.insertCorso(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      const renderArgs = res.render.firstCall.args[1];
      expect(renderArgs.alertMessage).to.equal('Tipologia non valida');
    });
  });

  describe('updateCorso', () => {
    it('dovrebbe redirect /corsi se ok', async () => {
      sinon.stub(corsiModel, 'updateCorsoById').resolves();
      const req = { params: { id: '1' }, body: { nome: 'Nuovo' } };
      const res = createResponse();

      await corsiController.updateCorso(req, res);

      expect(res.redirect.calledWith('/corsi')).to.be.true;
    });
  });

  describe('deleteCorso', () => {
    it('dovrebbe redirect /corsi se ok', async () => {
      sinon.stub(corsiModel, 'deleteCorsoById').resolves();
      const req = { params: { id: '1' } };
      const res = createResponse();

      await corsiController.deleteCorso(req, res);

      expect(res.redirect.calledWith('/corsi')).to.be.true;
    });
  });
});

