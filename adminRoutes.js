const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

router.post('/register', authController.register);
router.post('/login', authController.login);


router.get('/users', adminController.getAllUsers);
router.delete('/delete-user/:userId', adminController.deleteUser);
router.get('/gender-distribution', adminController.getGenderDistribution);
router.get('/age-distribution', adminController.getAgeDistribution);
router.get('/admin-details', adminController.getAdminDetails);
router.get('/user-details', adminController.getUserDetails);

module.exports = router;
