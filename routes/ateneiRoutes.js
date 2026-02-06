const express = require('express');
const ateneiController = require('../controllers/ateneiController');

const router = express.Router();

router.get('/', ateneiController.getAllAtenei);
router.post('/', ateneiController.insertAteneo);
router.post('/:id/delete', ateneiController.deleteAteneo);
router.get('/:id/edit', ateneiController.getAteneo);
router.post('/:id/edit', ateneiController.updateAteneo);

module.exports = router;
