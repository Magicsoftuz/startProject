const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getAllTours);
router.get('/tour/:slug', viewController.getOneTour);

module.exports = router;
