const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.login);

router.route('/forgotpassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').post(authController.resetPassword);
router
  .route('/updatePassword')
  .post(authController.protect, authController.updatePassword);

router
  .route('/updateUser')
  .patch(authController.protect, userController.updateUser);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(authController.protect, userController.addUser);
router
  .route('/:id')
  .get(authController.protect, userController.getUserById)
  .patch(authController.protect, userController.updateUser)
  .delete(
    authController.protect,
    authController.role(['admin', 'team-lead']),
    userController.deleteUser
  );

module.exports = router;
