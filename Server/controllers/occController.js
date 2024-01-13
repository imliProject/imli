// const db = require('../models')
// const { sign } = require('jsonwebtoken')
// const sequelize = require('sequelize');
// const Op = sequelize.Op
// // const moment = require('moment')
// // import { Op } from '@sequelize/core';

// //create main module
// const UserOcc = db.useroccs

// // main work 
// // const now = moment() 

// const getOccByDate = async (req, res) => {
//   const id = req.params.userID;
//   console.log('My ID is:', id);
//   let myDate = new sequelize.DATEONLY();
//   console.log('My date is:', myDate, id);
//   // let occs = await UserOcc.findAll({ attributes: ['OccName'],
//   let occs = await UserOcc.findAll({
//     where: { userID: id , 
//       OccSdate: {                     
//         [Op.gt]: myDate
//       },
//       },
//   })
//   res.status(200).send(occs)
// }
// const getUsrOcc = async (req, res) => {
//   const id = req.params.userID;
//   let occs = await UserOcc.findAll({ 
//     where: { userID: id },
//   })
//   res.status(200).send(occs)
// }

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


// module.exports = {
//   userOccSave,
//   getUsrOcc,
//   getOccByDate,
//  }