const express = require('express');
const tipologieController = require('../controllers/tipologieController');

const router = express.Router();

router.get('/', tipologieController.getAllTipologie);
router.post('/', tipologieController.insertTipologia);
router.post('/:id/delete', tipologieController.deleteTipologia);
router.get('/:id/edit', tipologieController.getTipologia);
router.post('/:id/edit', tipologieController.updateTipologia);

module.exports = router;
