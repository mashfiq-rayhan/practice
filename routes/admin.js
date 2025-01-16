const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/', adminController.getAdminPage);

router.get('/userlist', adminController.getUserList);

router.get('/profilelist', adminController.getProfileList);

module.exports = router;
