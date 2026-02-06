const sinon = require('sinon');
const { expect } = require('chai');

const ateneiModel = require('../models/ateneiModel');
const ateneiController = require('../controllers/ateneiController');

// helper per creare response fake
function createResponse() {
  return {
    status: sinon.stub().returnsThis(),
    render: sinon.stub().returnsThis(),
    send: sinon.stub().returnsThis(),
    redirect: sinon.stub().returnsThis()
  };
}

describe('ateneiController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getAllAtenei', () => {
    it('dovrebbe renderizzare la view con la lista degli atenei quando il model risponde', async () => {
      const fakeRows = [{ id: 1, nome: 'A' }, { id: 2, nome: 'B' }];
      sinon.stub(ateneiModel, 'getAllAtenei').resolves({ rows: fakeRows });

      const req = {};
      const res = createResponse();

      await ateneiController.getAllAtenei(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.render.calledOnce).to.be.true;
      expect(res.render.firstCall.args[0]).to.equal('atenei');
      expect(res.render.firstCall.args[1]).to.have.property('atenei').that.equals(fakeRows);
    });
  });

  describe('getAteneo', () => {
    it('dovrebbe renderizzare la view di edit se l\'ateneo esiste', async () => {
      const fakeAteneo = { id: 1, nome: 'Uni' };
      sinon.stub(ateneiModel, 'getAteneoById').resolves({ rows: [fakeAteneo] });

      const req = { params: { id: '1' } };
      const res = createResponse();

      await ateneiController.getAteneo(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.render.calledOnce).to.be.true;
      expect(res.render.firstCall.args[0]).to.equal('atenei-edit');
      expect(res.render.firstCall.args[1]).to.have.property('ateneo').that.equals(fakeAteneo);
    });

    it('dovrebbe rispondere 404 se non trovato', async () => {
      sinon.stub(ateneiModel, 'getAteneoById').resolves({ rows: [] });
      const req = { params: { id: '99' } };
      const res = createResponse();

      await ateneiController.getAteneo(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.send.calledOnce).to.be.true;
    });
  });

  describe('insertAteneo', () => {
    it('dovrebbe reindirizzare a /atenei se inserimento riuscito', async () => {
      sinon.stub(ateneiModel, 'insertAteneo').resolves();
      const req = { body: { nome: 'Nuovo Ateneo' } };
      const res = createResponse();

      await ateneiController.insertAteneo(req, res);

      expect(res.redirect.calledWith('/atenei')).to.be.true;
    });

    it('dovrebbe gestire errore 23505 (duplicato) e renderizzare con alertMessage', async () => {
      const error = new Error('duplicate');
      error.code = '23505';
      sinon.stub(ateneiModel, 'insertAteneo').rejects(error);
      const fakeRows = [{ id: 1, nome: 'A' }];
      sinon.stub(ateneiModel, 'getAllAtenei').resolves({ rows: fakeRows });

      const req = { body: { nome: 'Duplicato' } };
      const res = createResponse();

      await ateneiController.insertAteneo(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.render.calledOnce).to.be.true;
      const renderArgs = res.render.firstCall.args[1];
      expect(renderArgs).to.have.property('alertMessage', 'Esiste già un ateneo con questo nome');
      expect(renderArgs).to.have.property('atenei').that.equals(fakeRows);
    });
  });

  describe('updateAteneo', () => {
    it('dovrebbe reindirizzare a /atenei se aggiornamento riuscito', async () => {
      sinon.stub(ateneiModel, 'updateAteneoById').resolves();
      const req = { params: { id: '1' }, body: { nome: 'Aggiornato' } };
      const res = createResponse();

      await ateneiController.updateAteneo(req, res);

      expect(res.redirect.calledWith('/atenei')).to.be.true;
    });
  });

  describe('deleteAteneo', () => {
    it('dovrebbe reindirizzare a /atenei se cancellazione riuscita', async () => {
      sinon.stub(ateneiModel, 'deleteAteneoById').resolves();
      const req = { params: { id: '1' } };
      const res = createResponse();

      await ateneiController.deleteAteneo(req, res);

      expect(res.redirect.calledWith('/atenei')).to.be.true;
    });
  });
});

