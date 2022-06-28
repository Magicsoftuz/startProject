const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.login);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.addUser);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
