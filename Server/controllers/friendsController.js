const db = require('../models')
const { sign } = require('jsonwebtoken')
const sequelize = require('sequelize');
const Op = sequelize.Op;

//create main module
const UsrImliFrnds = db.UsrImliFrnds
const Newusers = db.Newusers
 

// main work 
const delRcvRqst = async (req, res) => {
  UsrImliFrnds.destroy({
    where: {
      // UserMobile: userMob, UserFrndsMobile: usrfrndmob, RequestStatus: 'S'
      UserFrndsMobile: req.params.UserFrndsMobile, UserMobile: req.params.UserMobile, RequestStatus: 'S'
    }
  }).then(result => {
    // res.send(result);
    res.sendStatus(status);
  }).catch(error => {
    console.log(error)
  })
}
//delFrndRqts and delRcvRqst can be same like one function
const delFrndRqts = async (req, res) => {
  console.log("the values:", req.params);
  UsrImliFrnds.destroy({
  where: {
    UserMobile: req.params.UserMobile, UserFrndsMobile: req.params.UserFrndsMobile
  }
}).then(result => {
  res.send(result);
}).catch(error => {
  console.log(error)
})
}
const friendsStatUpdt = async (req, res) => {
  
  let tid = req.params.UserID;
  req.body.UserFrndsID = req.params.UserID;
  
  // let frommob = req.params.FromMob;
  req.body.RequestStatus = 'A';

  
  console.log('The body for update :', req.body);
  UsrImliFrnds.update(
    req.body
    ,
    { returning: true, where: { UserFrndsMobile: req.params.UserFrndsMobile, UserMobile: req.params.UserMobile, RequestStatus: 'S' } }
  )
    .then((afrnd) => {
      if (afrnd[1] == 0)
        console.log("data was NOT Updated", { tid })
      else
        console.log("data was Updated for ", { tid })

      res.status(200).send(afrnd)
      // res.redirect('/');
    })
    .catch((err) => {
      console.log("Error : ", err)
    });

}

//Get mobiles of the user in IMLI application whome request is sent

const getRqstRcvdByUid = async (req, res) => {
  const mobid = req.params.UserMobile;
  let rcvdmobs = await UsrImliFrnds.findAll({
    where: { UserFrndsID: '', UserFrndsMobile: mobid, RequestStatus: 'S' },    //sent to your ID accept will update S to A
  })
  res.status(200).send(rcvdmobs)
}

// get IMLI friends for current user  and Status as A
const getIFriendsById = async (req, res) => {
  const id = req.params.UserID;
  let userfrnds = await UsrImliFrnds.findAll({ 
    where: { 
      [Op.or] : [{
        UserID: id
      },
      {
        UserFrndsID: id
      } 
    ]
      , RequestStatus: 'A'},
  })
  res.status(200).send(userfrnds)
}
const getIFriendsCntById = async (req, res) => {
  const id = req.params.UserID;
  let cntfrnds = await UsrImliFrnds.count({ 
    where: { 
      [Op.or] : [{
        UserID: id
      },
      {
        UserFrndsID: id
      } 
    ]
      , RequestStatus: 'A'},
  })
  res.status(200).send((cntfrnds).toString())
}
// const getIMobilesById = async (req, res) => {
//   const id = req.params.UserID;
//   console.log( 'The user ID :', id);
//   let userfrnds = await UsrImliFrnds.findAll({ attributes: ['UserFrndsMobile'],
//     where: { 
//       [Op.or] : [{
//         UserID: id
//       },
//         {
//           UserFrndsID: id
//         }
//       ],  
//         RequestStatus: 'A'},    

//   })
//   res.status(200).send(userfrnds)
// }

//Get mobile of the user  whome request is sent
const getMobilesByUid = async (req, res) => {
  const id = req.params.UserID;
  let umobile = await UsrImliFrnds.findAll({
    where: { UserID: id, RequestStatus: 'S'},
  })
  res.status(200).send(umobile)
}

const friendsDtlSave = async (req, res) => {
  console.log(' In controller friendsDtlSave :');
  
  let info = {
    UserID: req.body.UserID,
    UserMobile: req.body.UserMobile,
    UserFrndsMobile: req.body.UserFrndsMobile,
    RequestStatus: req.body.RequestStatus,
    UserFrndsID: req.body.UserFrndsID,
  }
  console.log("info Body:", info);
  const ImliFrnds = await UsrImliFrnds.findOne( {
    where: { UserMobile: info.UserMobile, UserFrndsMobile: info.UserFrndsMobile },
  } );
  if (ImliFrnds) {
    // Alert.alert('This request already sent, thanks.');
       if(ImliFrnds.RequestStatus === 'S') {
           res.status(400).send({ error: "This request already sent, thanks." })
           return
          }
        else if (ImliFrnds.RequestStatus === 'A') {
        res.status(400).send({ error: "This request is already your friend, thanks." }) 
        return 
      }
  } else {
  const usrfrndslist = await UsrImliFrnds.create(info)
   res.status(200).send(usrfrndslist)
  }
} 

module.exports = {
  delFrndRqts,
  friendsStatUpdt,
  getRqstRcvdByUid,
  getMobilesByUid,
  friendsDtlSave,
  getIFriendsById,
  getIFriendsCntById,
  // getIMobilesById,
  delRcvRqst   
}