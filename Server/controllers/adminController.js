const db = require('../models')
const { sign } = require('jsonwebtoken')
const sequelize = require('sequelize');

//create main module
const Vendors = db.Vendors
const ItemDtls = db.ItemDtls


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

const addItem = async (req, res) => {
  
  let info = {
    ItemID: req.body.ItemID,
    ItemName: req.body.ItemName,
    ItemPic: req.body.ItemPic,
    UnitPrice: req.body.UnitPrice,
    NoOfItems: req.body.NoOfItems,
    ItemColor: req.body.ItemColor,
    CategoryID: req.body.CategoryID,
    VendID: req.body.VendID,
    ItemStatus: req.body.ItemStatus,
  }
  console.log('in addCategory');
  const exitem = await ItemDtls.findOne({ where: {ItemID: req.body.ItemID} });
   if ( exitem === null) {
    const item = await Vendors.create(info)
    res.status(200).send(item)
   } else {
     console.log(' Please check the data again')
     res.status(200).send(exitem)
   } 
}

module.exports = { 
  addVendor,
  addItem
   
}