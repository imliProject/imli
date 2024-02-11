const db = require('../models')
const { sign } = require('jsonwebtoken')
const sequelize = require('sequelize');

//create main module
const Rcvdmobs = db.rcvdrqst
// const UsrFrnds = db.usrfrnds
// const UserOcc = db.useroccs
// const AllCats = db.allcats
// const SubCat = db.subcats
// const GiftCat = db.giftcats
// const ProfileImg = db.profileimgs
const Login = db.logins
// const User = db.users
// const UserDtl = db.userdtls
// const UserAddress = db.useraddrs

const NewUser = db.Newusers;
const NewUserAddress = db.UserAddress;
const ItemDtls =db.ItemDtls;
const UserWishList = db.UserWishList;

// const UserImg = db.userimgsrcs

// main work 
// const delFrndRqts = async (req, res) => {
//   console.log("the values:", req.params);
//   UsrFrnds.destroy({
//   where: {
//     ToMob: req.params.tomob, FromMob: req.params.frommob
//   }
// }).then(result => {
//   res.send(result);
// }).catch(error => {
//   console.log(error)
// })
// }
// const friendsStatUpdt = async (req, res) => {

//   let tid = req.params.ToUid;
//   let frommob = req.params.FromMob;
//   req.body.Status = 'A';

//   console.log('The body for update :', req.body.ToUid);
//   console.log('The body for update :', req.body.FromMob);
//   UsrFrnds.update(
//     req.body
//     ,
//     { returning: true, where: { ToUid: req.body.ToUid, FroMMob: req.body.FromMob } }
//   )
//     .then((afrnd) => {
//       if (afrnd[1] == 0)
//         console.log("data was NOT Updated", { tid })
//       else
//         console.log("data was Updated for ", { tid })

//       res.status(200).send(afrnd)
//       // res.redirect('/');
//     })
//     .catch((err) => {
//       console.log("Error : ", err)
//     });

// }


// R = Received, A = accepted, D = Deactivated, S = Sent

// const getRqstRcvdByUid = async (req, res) => {
//   const id = req.params.userID;
//   let rcvdmobs = await UsrFrnds.findAll({
//     where: { ToUid: id, Status: 'S' },    //sent to your ID accept will update S to A
//   })
//   res.status(200).send(rcvdmobs)
// }

// get friends with ToUid as current user name and Status as A
// const getFriendsById = async (req, res) => {
//   const id = req.params.userID;
//   let userfrnds = await UsrFrnds.findAll({
//     where: { Status: 'A', Touid: id },    

//   })
//   res.status(200).send(userfrnds)
// }

// const getAllMobiles = async (req, res) => {
//   let allmobile = await User.findAll({ 
//   })
//   res.status(200).send(allmobile)
  // User.findAll({attributes: ['UserMobile']
  //   })
  //     .then(data => {
  //       if (data) {
  //         console.log( 'the requested :', data.users.UserMobile );
  //         res.send(data.users.UserMobile);
  //       } else {
  //         res.status(404).send({
  //           message: `Cannot find Mobiles.`
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message: "Error retrieving Data" 
  //       });
  //     });
// }
// const getMobilesByUid = async (req, res) => {
//   const id = req.params.userID;
//   let umobile = await UsrFrnds.findAll({
//     where: { userID: id , Status: 'S'},
//   })
//   res.status(200).send(umobile)
// }

const addUser = async (req, res) => {
  
  let info = {
    UserID: req.body.UserID,
    UserName: req.body.UserName,
    UserEmailID: req.body.UserEmailID,
    UserMobile: req.body.UserMobile,
    // UserPicPath: req.body.UserPicPath,
  }
  console.log('in addUser');
  const exuser = await NewUser.findOne({ where: {UserMobile: req.body.UserMobile} });
   if ( exuser === null) {
    const user = await NewUser.create(info)
    res.status(200).send(user)
   } else {
     console.log(' Please check the Mobile number')
     res.status(200).send(exuser)
   }
  
  
}
const addUserAddress = async (req, res) => {
  let info = {
    UserID: req.body.UserID,
    UserHome: req.body.UserHome,
    UserStreet: req.body.UserStreet,
    UserDistrict: req.body.UserDistrict,
    UserState: req.body.UserState,
    UserPin: req.body.UserPin,
    UserCountry: req.body.UserCountry
  }
  console.log('in addUser')
  const user = await NewUserAddress.create(info) 
  res.status(200).send(user)
}

const addProfileImage = async (req, res) => {

    let id = req.params.UserID;
    // let UserPicPath = req.params.UserPicPath; 
    let UserPicPath = "My pic path"; //this needs to be captured in the program
    console.log('in Profile image', id);

    NewUser.update({
        UserPicPath: UserPicPath}
        , {
          where: {
            UserID: id,
          },
      })
      .then( (newuser)  => {    
        res.status(200).send(newuser)
      })
      .catch((err) => {
        console.log("Error : ", err)
      });
    }

//UpdtUserWishList used in PaymentScreen... updtusrwishlist
const UpdtUserWishList = (req, res) => {
  let id = req.params.UserID;
  let itid = req.params.ItemID;
  
  Status = req.body.Status;
  
  UserWishList.update(
    req.body,
    {
      where: {
        UserID: id,
        ItemID: itid,
      },
    }).then ( (nwusrwshlst) => {
      res.status(200).send(nwusrwshlst)
    }).catch((err) => {
      console.log("Error : ", err)
    });
}
const updtUserAddress = (req, res) => {
  let id = req.params.UserID;
  console.log('in update address:', id);
  let info = {
    UserHome: req.body.UserHome,
    UserStreet: req.body.UserStreet,
    UserDistrict: req.body.UserDistrict,
    UserState: req.body.UserState,
    UserPin: req.body.UserPin,
    UserCountry: req.body.UserCountry
  }

  NewUserAddress.update(
       req.body
        , {
          where: {
            User_ID: id,
          },
      })
      .then( (newuseraddres)  => {    
        res.status(200).send(newuseraddres)
      })
      .catch((err) => {
        console.log("Error : ", err)
      });
}
const getAllUserItems = async (req, res) => {
  UserWishList.findAll({
   
    include: [ ItemDtls]
  // {  
  //   where: {UserID: 'smishra'}
  // }] 
       }).then( (alluseritems) => 
        res.status(200).send(alluseritems)
       )  
          
}
const getUserItemsByID = async (req, res) => {
  UserWishList.findAll({
    
    where: {UserID: req.params.UserID, Status: 'A'},
    include: [ ItemDtls]
  // {  
  //   where: {UserID: 'smishra'}
  // }] 
       }).then( (alluseritems) => 
        res.status(200).send(alluseritems)
       )  
          
}

const addUserWishList = async (req, res) => {
  let info = {
    UserID: req.body.UserID,
    CategoryID: req.body.CategoryID,
    ItemID: req.body.ItemID
  }
  console.log('in addUserWishList')
  const userwishlist = await UserWishList.create(info) 
  res.status(200).send(userwishlist)
}

const getUserItemsCount = async (req, res) => {
  const id = req.params.UserID;
  const wishcnt = await UserWishList.count({
    where: { UserID: id, Status: 'A' },
  });
  res.status(200).send((wishcnt).toString())
}

const getUsrByMob = async (req, res)  => {
  // console.log( 'the requested param:', req );
  const umobile = req.params.ToMob;
  console.log( 'the requested param:', umobile );
  let usrdtl = await NewUser.findAll({
    where: { UserMobile: umobile },
  })
  res.status(200).send(usrdtl)
  
  // NewUser.findAll({
  //   where: { UserMobile: umobile },
  // })
  //   .then(data => {
  //     if (data) {
  //       console.log( 'the requested :', data );
  //       res.send(data);
  //     } else {
  //       res.status(404).send({
  //         message: `Cannot find User with Mobile=${umobile}.`
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Error retrieving Mobile=" + umobile
  //     });
  //   });
}

// const getMobilesByUid = async (req, res) => {
//   let users = await User.findAll({ attributes: [[sequelize.fn('DISTINCT', sequelize.col('UserMobile')), 'UserMobile']],
//     include: { model: UsrFrnds, required: true },
//   })
//   res.status(200).send(users)
// }

// const friendsDtlSave = async (req, res) => {
//   console.log(' In controller :');
//   let info = {
//     userID: req.body.userID,
//     FromMob: req.body.FromMob,
//     ToMob: req.body.ToMob,
//     Status: req.body.Status,
//     ToUid: req.body.ToUid,
//   }
//   console.log("info Body:", info);
//   const userfrnds = await UsrFrnds.findOne( {
//     where: { FromMob: info.FromMob, ToMob: info.ToMob },
//   } );
//   if (userfrnds) {
//     // Alert.alert('This request already sent, thanks.');
//     res.status(400).send({ error: "This request already sent, thanks." });
//   } else {
//   const usrfrndslist = await UsrFrnds.create(info)
//    res.status(200).send(usrfrndslist)
//   }
// }

// const getAllCats = async (req, res) => {
//   let acats = await AllCats.findAll({
//   })
//   res.status(200).send(acats)
// }

const getUsrOcc = async (req, res) => {
  const id = req.params.userID;
  let occs = await UserOcc.findAll({ attributes: [[sequelize.fn('DISTINCT', sequelize.col('OccName')), 'OccName']],
    where: { userID: id },
  })
  res.status(200).send(occs)
}

// const userOccSave = async (req, res) => {
//   let info = {
//     userID: req.body.userID,
//     OccID: req.body.OccID,
//     OccName: req.body.OccName,
//     Status: req.body.Status,
//     OccSdate: req.body.OccSdate,
//     OccEdate: req.body.OccEdate
//   }
//   console.log("info Body:", info)
//   const userocc = await UserOcc.create(info)
//    res.status(200).send(userocc)
// }
// const getCategories = async (req, res) => {
//   const id = req.params.userID;
//   let cats = await GiftCat.findAll({ attributes: [[sequelize.fn('DISTINCT', sequelize.col('CatID')), 'CatID'], CatName],
//     where: { userID: id },
//   })
//   res.status(200).send(cats)
// }

// const getSubCat = async (req, res) => {
//   const id = req.params.catID;
//   let subcats = await SubCat.findAll({ attributes: [[sequelize.fn('DISTINCT', sequelize.col('SubName')), 'SubName']],
//     where: { CatID: id },
//   })
//   res.status(200).send(subcats)
// }
// const giftCatSave = async (req, res) => {
//   let info = {
//     userID: req.body.userID,
//     CatID: req.body.CatID,
//     CatName: req.body.CatName,
//     Status: req.body.Status
//   }
//   console.log("info Body:", info)
//   const giftcat = await GiftCat.create(info)
//    res.status(200).send(giftcat)
// }
// const ProfileImgSave = async (req, res) => {
//   let info = {
//     userID: req.body.userID,
//     UsrSrcPath: req.body.UsrSrcPath,
//     type: req.body.type,
//     fileName: req.body.fileName
//   }
//   console.log("info Body:", info)
//   const profileimg = await ProfileImg.create(info)
//   res.status(200).send(profileimg)
// }
const getAdmin = async (req, res) => {
  const id = req.params.userID;
  const Password = req.params.Password;
  console.log("UserID ", id, Password)
  Login.findOne({
    where: { userID: id, Password: Password },
  })
    .then(data => {
      if (data) {

        const jsontoken = sign({ result: data.userID }, "jwtadmin", {
          expiresIn: "1h"
        })
        console.log('the data jsontoken :', jsontoken);
        // message: "Error retrieving User with UserID=" + data.userID
        res.send(jsontoken);
      } else {
        res.status(404).send({
          message: `Cannot find User with userID=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with UserID=" + id
      });
    });

}
const getLogin = async (req, res) => {
  const id = req.params.UserID;
  const Password = req.params.Password;
  console.log("UserID ", id, Password)
  Login.findOne({
    where: { userID: id, Password: Password },
  })
    .then(data => {
      if (data) {

        const jsontoken = sign({ result: data.userID }, "jwt123", {
          expiresIn: "1h"
        })
        console.log('the data jsontoken :', jsontoken);
        // message: "Error retrieving User with UserID=" + data.userID
        res.send(jsontoken);
      } else {
        res.status(404).send({
          message: `Cannot find User with userID=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with UserID=" + id
      });
    });
};

const addLogin = async (req, res) => {
  
  let info = {
    UserID: req.body.UserID,
    Password: req.body.Password
  }

  console.log('in addLogin' , req.body.UserID);
  const login = await Login.create(info)
  res.status(200).send(login)
}

// const addUser = async (req, res) => {
//   let info = {
//     userID: req.body.userID,
//     UserName: req.body.UserName,
//     UserEmailID: req.body.UserEmailID,
//     UserMobile: req.body.UserMobile,
//   }
//   console.log('in addUser')
//   const user = await User.create(info)
//   res.status(200).send(user)
// }
const getOneUser = async (req, res) => {
  const id = req.params.UserID;
  console.log(" In UgetOneUser UserID ", id);
  NewUser.findOne({
    where: { UserID: id },
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with userID=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with UserID=" + id
      });
    });
};

// const getOneCat = async (req, res) => {
//   const id = req.params.userID;
//   const catid = req.params.CatID;
//   console.log("UserID ", id, catid)
//   GiftCat.findOne({
//     where: { userID: id, CatID: catid },
//   })
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Category with userID=${id}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Category with UserID=" + id
//       });
//     });
// };

// const getCatCount = async (req, res) => {
//   const id = req.params.userID;
//   const catid = req.params.CatID;
//   console.log("UserID ", id, catid)
//   GiftCat.count({
//     where: { userID: id, CatID: catid },
//   })
//     .then(count => {
//       if (count != 0) {
//         return false;
//       }
//       else {
//         return true;
       
//       }
//     })
// };

const getUserAddress = async (req, res) => {
  const id = req.params.UserID;
  console.log("UserID in getUserAddress", id)
  NewUserAddress.findOne({
    where: { UserID: id },
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with userID=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with UserID=" + id
      });
    });
};
// const getUserPic = async (req, res) => {
//   const id = req.params.userID;
//   console.log("UserID  getUserPic", id)
//   NewUser.findOne({
//     where: { userID: id },
//   })
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find User with userID=${id}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving User with UserID=" + id
//       });
//     });
// };

// const addUserAddr = async (req, res) => {
//   let infoaddr = {
//     UserHome: req.body.UserHome,
//     UserStreet: req.body.UserStreet,
//     UserDistrict: req.body.UserDistrict,
//     UserState: req.body.UserState,
//     UserPin: req.body.UserPin,
//     UserCountry: req.body.UserCountry,
//     userID: req.body.userID
//   }

//   const useraddr = await UserAddr.create(infoaddr)
//   res.status(200).send(useraddr)
// }
const UserAddrsUpdt = async (req, res) => {
  let id = req.params.UserID

  NewUserAddress.update(
    req.body
    ,
    { returning: true, where: { userID: id } }
  )
    .then((useraddr) => {
      if (useraddr[1] == 0)
        console.log("data was NOT Updated", { id })
      else
        console.log("data was Updated")
      res.status(200).send(useraddr)
      // res.redirect('/');
    })
    .catch((err) => {
      console.log("Error : ", err)
    });
}
const UserPicUpdt = async (req, res) => {
  let id = req.params.UserID
console.log ('The userid is :', req.params.UserID );
  NewUser.update(
    req.body
    ,
    { returning: true, where: { UserID: id } }
  )
    .then((profileimg) => {
      if (profileimg[1] == 0)
        console.log("data was NOT Updated", { id })
      else
        console.log("data was Updated")
      res.status(200).send(useraddr)
      // res.redirect('/');
    })
    .catch((err) => {
      console.log("Error : ", err)
    });
}


module.exports = {
  // getAllMobiles,
  // delFrndRqts,
  // friendsStatUpdt,
  // getRqstRcvdByUid,
  // getMobilesByUid,
  getUsrByMob,
  // friendsDtlSave,
  // getFriendsById,
  // userOccSave,
  // getUsrOcc,
  // getCatCount,
  // getOneCat,
  // getAllCats,
  // getCategories,
  // getSubCat,
  // giftCatSave,
  // getUserPic,
  getUserAddress,
  // ProfileImgSave,
  addLogin,
  getLogin,
  getAdmin,
  addUser,
  getOneUser,
  // addUserAddr,
  UserAddrsUpdt,
  UserPicUpdt,
  addUserAddress,
  addProfileImage,
  updtUserAddress,
  getAllUserItems,
  getUserItemsByID,
  addUserWishList,
  UpdtUserWishList,
  getUserItemsCount

}