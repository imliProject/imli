const occasionController = require('../controllers/occasionController.js')

const express = require('express');
const router = express.Router();
 

router.post('/addoccasion', occasionController.addOccasion)
router.get('/useroccasionsdtl/:UserID', occasionController.userOccasionsDtl)
router.get('/getusroccdtlbydate/:UserID', occasionController.getUsrOccDtlByDate)
router.get('/getusrocccnt/:UserID', occasionController.getUserOccCount)


module.exports = router