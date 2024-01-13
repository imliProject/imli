const db = require('../models')
const { sign } = require('jsonwebtoken')
const sequelize = require('sequelize');

//create main module
const Vendors = db.Vendors


// main work 

const addVendor = async (req, res) => {
  
  let info = {
    VendID: req.body.VendID,
    VendName: req.body.VendName,
    VendMobile: req.body.VendMobile,
    VendEmailID: req.body.VendEmailID,
    VendCity: req.body.VendCity,
    VendLogoPath: req.body.VendLogoPath,
    VendStatus: req.body.VendStatus,
  }
  console.log('in addCategory');
  const exvendor = await Vendors.findOne({ where: {VendID: req.body.VendID} });
   if ( exvendor === null) {
    const vendor = await Vendors.create(info)
    res.status(200).send(vendor)
   } else {
     console.log(' Please check the data again')
     res.status(200).send(exvendor)
   } 
}

module.exports = { 
  addVendor
   
}