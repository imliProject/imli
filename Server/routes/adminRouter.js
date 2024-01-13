const adminController = require('../controllers/adminController.js')

const express = require('express');
const router = express.Router();

router.get('/addvendor', adminController.addVendor)


module.exports = router