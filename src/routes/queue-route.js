const express = require('express');

const orderController = require('../controllers/order-controller');

const router = express.Router();

router.get('/queue',orderController.getAllOrders);

module.exports = router;
