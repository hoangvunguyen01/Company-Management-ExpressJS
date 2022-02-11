const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/', siteController.index);
router.get('/login', siteController.login);
router.post('/login', siteController.loginAccount);

module.exports = router;
