const adminController = require('../controllers/adminController.js')

const express = require('express');
const router = express.Router();

router.post('/addvendor', adminController.addVendor)
router.post('/additem', adminController.addItem)


module.exports = router