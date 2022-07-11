const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getAllTours);
router.get('/tour', viewController.getOneTour);

module.exports = router;
