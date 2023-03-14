const express = require('express');

const utilController = require('../controllers/util-controller');

const router = express.Router();

router.get('/server',utilController.getAllServers);

module.exports = router;
