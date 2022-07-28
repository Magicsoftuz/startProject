const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getAllTours);
router.get('/tour/:id', viewController.getOneTour);
router.get('/login', viewController.login);

module.exports = router;
