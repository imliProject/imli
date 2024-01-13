const friendsController = require('../controllers/friendsController.js')

const express = require('express');
const router = express.Router();


router.post('/friendsdtlsave', friendsController.friendsDtlSave)
router.get('/getifriendsbyid/:UserID', friendsController.getIFriendsById)
router.get('/getifriendscntbyid/:UserID', friendsController.getIFriendsCntById)
// router.get('/getimobilesbyid/:UserID', friendsController.getIMobilesById)
router.delete('/delfrndrqts/:UserMobile/:UserFrndsMobile', friendsController.delFrndRqts)
router.delete('/delrcvrqst/:UserFrndsMobile/:UserMobile/:RequestStatus', friendsController.delRcvRqst)
router.put('/friendsstatupdt/:UserID/:UserMobile/:UserFrndsMobile', friendsController.friendsStatUpdt)
router.get('/getrqstrcvd/:UserMobile', friendsController.getRqstRcvdByUid)
router.get('/getmobilesbyuid/:UserID', friendsController.getMobilesByUid)

 

module.exports = router