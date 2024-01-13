const categoryController = require('../controllers/categoryController.js')

const express = require('express');
const router = express.Router();
 

router.post('/addcategory', categoryController.addCategory)

router.get('/getelectronicsitems', categoryController.getElectronicsItems)
router.get('/getfloweritems', categoryController.getFlowerItems)
router.get('/getallitems', categoryController.getAllItems)


module.exports = router