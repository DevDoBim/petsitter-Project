const express = require('express');
const router = express.Router();

const PetSittersController = require('../controllers/petsitters.controller');
const petSittersController = new PetSittersController();

router.get('/', petSittersController.getPetSitters);

module.exports = router;
