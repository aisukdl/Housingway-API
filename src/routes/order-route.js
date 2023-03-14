const express = require('express');

const orderController = require('../controllers/order-controller');

const router = express.Router();

router.post('/create', orderController.createOrder);
router.delete('/delete/:orderId', orderController.deleteOrder);
router.get('/myorder', orderController.getAllOrdersByUserId);
router.get('/myorder/:orderId', orderController.getOrderByOrderId);
router.patch('/:orderId', orderController.updateStatus);

module.exports = router;
