const express = require('express');
const homepageController = require('../controllers/homepageController');

const router = express.Router();

router.get('/', homepageController.getHomepageData);
router.post('/', homepageController.insertAssociazione);
router.get('/ricerca', homepageController.getCorsiAtenei);

module.exports = router;
