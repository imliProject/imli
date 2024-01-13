const paymentController = require('../controllers/paymentController.js')

const express = require('express');
const router = express.Router();
 
router.post('/createorder', paymentController.createOrder);
// router.get('/verifypayment/:orderid/:transaction', paymentController.verifyPayment);

module.exports = router