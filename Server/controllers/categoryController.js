const db = require('../models')
const { sign } = require('jsonwebtoken')
const sequelize = require('sequelize');

//create main module
const AllCats = db.allcats
// const SubCat = db.subcats
const GiftCat = db.giftcats
const CategoryImg = db.alldtlcats
const CategoryDtls = db.CategoryDtls;
const ItemDtls = db.ItemDtls;

// main work 

const addCategory = async (req, res) => {
  
  let info = {
    CategoryID: req.body.CategoryID,
    CategoryName: req.body.CategoryName,
    CategoryPic: req.body.CategoryPic,
  }
  console.log('in addCategory');
  const excategory = await CategoryDtls.findOne({ where: {CategoryID: req.body.CategoryID} });
   if ( excategory === null) {
    const category = await CategoryDtls.create(info)
    res.status(200).send(category)
   } else {
     console.log(' Please check the data again')
     res.status(200).send(excategory)
   } 
}

const getAllItems = async (req, res) => {
  ItemDtls.findAll()
  .then( (allitems) => {
    res.status(200).send(allitems)
   })  
}
const getElectronicsItems = async (req, res) => {
  ItemDtls.findAll({ where: {CategoryID: "EL000001"}, include: [CategoryDtls]
  // {
  //   where: {CategoryID: "EL000001"}
  // }] 
       }).then( (allcategory) => {
        res.status(200).send(allcategory)
       })  
          
}

const getFlowerItems = async (req, res) => {
  ItemDtls.findAll({ where: {CategoryID: "FL000001"}, include: [CategoryDtls]
       }).then( (allflowers) => {
        res.status(200).send(allflowers)
       })  
          
}
// const deleteGiftCat = async (req, res) => {
//   console.log("the values:", req.params);

//   GiftCat.destroy({
//     where: {
//       userID: req.params.userID, SubName: req.params.SubName
//     }
//   }).then(result => {
//     const statusCode = 200;
//     if (statusCode >= 100 && statusCode < 600) {
//       res.status(statusCode).send(result);
//     } else {
//       res.status(500);
//     }
//     // res.status(200).send(result);
//   }).catch(error => {
//     console.log(error)
//   })
// }

// const getAllDtlCat = async (req, res) => {
//   const id = req.params.CatID;
//   const subid = req.params.SubCatID;
//   let dtlcats = await CategoryImg.findAll({
//     where: { CatID: id, SubCatID: subid },
//   })
//   res.status(200).send(dtlcats)
// }
// const getAllCats = async (req, res) => {
//   let acats = await AllCats.findAll({
//   })
//   res.status(200).send(acats)
// }

// const getCategories = async (req, res) => {
//   const id = req.params.userID;
//   console.log('The TOUID: ', id);
//   let cats = await GiftCat.findAll({
//     where: { UserID: id },
//   })
//   res.status(200).send(cats)
// }

// const getSubCat = async (req, res) => {
//   const id = req.params.catID;
//   let subcats = await SubCat.findAll({
//     where: { CatID: id },
//   })
//   res.status(200).send(subcats)
// }
// const giftCatSave = async (req, res) => {
//   // console.log('In giftcat Save:', req.body);
//   let info = {
//     userID: req.body.userID,
//     CatID: req.body.CatID,
//     CatName: req.body.CatName,
//     SubName: req.body.SubName,
//     SubcatID: req.body.SubcatID,
//     Status: req.body.Status
//   }
//   console.log("info Body:", info)
//   const giftcat = await GiftCat.create(info)
//   res.status(200).send(giftcat)
// }
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
// const CategoryImgSave = async (req, res) => {
//   let info = {
//     CatID: req.body.CatID,
//     SubCatID: req.body.SubCatID,
//     CatSrcPath: req.body.CatSrcPath,
//     Price: req.body.Price,
//     ItemName: req.body.itemName
//   }
//   console.log("info Body:", info)
//   const categoryimg = await CategoryImg.create(info)
//   res.status(200).send(categoryimg)
// }

module.exports = {
  // getCatCount,
  // getOneCat,
  // getAllCats,
  // getCategories,
  // getSubCat,
  // giftCatSave,
  // CategoryImgSave,
  // getAllDtlCat,
  // deleteGiftCat,
  addCategory,
  getElectronicsItems,
  getFlowerItems,
  getAllItems
}