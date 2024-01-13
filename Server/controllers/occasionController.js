const db = require('../models')
const { sign } = require('jsonwebtoken');
const sequelize = require('sequelize');
const Op = sequelize.Op

//create main module
const Occasions = db.Occasions;
const Newusers = db.Newusers;
 
const addOccasion = async (req, res) => {
  console.log(' the date:', req.body.OccasionEndDate);

  let info = {
    OccasionDesc: req.body.OccasionDesc,
    OccasionStartDate: req.body.OccasionStartDate,
    OccasionEndDate: req.body.OccasionEndDate,
    UpdatedBy: req.body.UpdatedBy,
    OccasionStatus: req.body.OccasionStatus
  }
  console.log('in addOccassion');
  // const exoccasion = await Occasions.findOne({ where: {OccasionID: req.body.OccasionID} });
  //  if ( exoccasion === null) {
    const occasion = await Occasions.create(info)
    res.status(200).send(occasion)
  //  } else {
  //    console.log(' Please check the data Again')
  //    res.status(200).send(exoccasion)
  //  }
}

  const userOccasionsDtl = async (req, res) => {
     let id = req.params.UserID;
    Occasions.findAll( {
       
        where: {UpdatedBy: id , OccasionStatus: 'A'} ,
         
      } 
    )
    .then (function(occasions) {
      res.status(200).send(occasions)
    })
  //   db.Newusers.findAll({ include: [ Occasions, {
  //     where: {UpdatedBy: "smishra" , OccasionStatus: 'A'}
  //   }] }).then(function(occasions) {
  //     res.status(200).send(occasions)
  // }) 

  }

  const getUsrOccDtlByDate = async (req, res) => { 
    const id = req.params.UserID;
    console.log('My ID is:', id);
    let myDate = new sequelize.DATEONLY();
    console.log('My date is:', myDate, id);
    // let occs = await UserOcc.findAll({ attributes: ['OccName'],
    let occs = await Occasions.findAll({
      where: { UpdatedBy: id , 
        OccasionStartDate: {                     
          [Op.gt]: myDate
        }
        },
    })
    res.status(200).send(occs)
  }

  const getUserOccCount = async (req, res) => {
    const id = req.params.UserID;
    let myDate = new sequelize.DATEONLY();
    const wishcnt = await Occasions.count({
      where: { UpdatedBy: id , 
        OccasionStartDate: {                     
          [Op.gt]: myDate
        }
        },
    });
    res.status(200).send((wishcnt).toString())
  }

module.exports = {
  
    addOccasion,
    userOccasionsDtl,
    getUsrOccDtlByDate,
    getUserOccCount
   
}