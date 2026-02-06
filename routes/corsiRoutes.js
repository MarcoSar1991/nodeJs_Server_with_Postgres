const express = require('express');
const corsiController = require('../controllers/corsiController');

const router = express.Router();

router.get('/', corsiController.getAllCorsi);
router.post('/', corsiController.insertCorso);
router.post('/:id/delete', corsiController.deleteCorso);
router.get('/:id/edit', corsiController.getCorso);
router.post('/:id/edit', corsiController.updateCorso);

module.exports = router;
