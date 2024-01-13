const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: true,

  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    aquire: dbConfig.aquire,
    idle: dbConfig.idle
  }
}

)

sequelize.authenticate()
  .then(() => {
    console.log('connected')
  })
  .catch(err => {
    console.log('Error ' + err)
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


// db.usrfrnds = require('./usrFrndsModel.js')(sequelize, DataTypes)
// db.useroccs = require('./occListModel.js')(sequelize, DataTypes)
// db.allcats = require('./allCatModel.js')(sequelize, DataTypes)
// db.subcats = require('./subCatModel.js')(sequelize, DataTypes)
// db.giftcats = require('./giftCatModel.js')(sequelize, DataTypes)
// db.profileimgs = require('./profileModel.js')(sequelize, DataTypes)

// db.users = require('./userModel.js')(sequelize, DataTypes)
// db.useraddrs = require('./userAdressModel.js')(sequelize, DataTypes)
// db.alldtlcats = require('./allCatDtlsModel.js')(sequelize, DataTypes)

db.logins = require('./loginModel.js')(sequelize, DataTypes)
db.Vendors = require('./vendorModel.js')(sequelize, DataTypes)
db.Newusers = require('./usersModel.js')(sequelize, DataTypes)
db.UserAddress = require('./userAddressModel.js')(sequelize, DataTypes)
db.Occasions = require('./occasionModel.js')(sequelize, DataTypes)
db.CategoryDtls = require('./categoryDtlsModel.js')(sequelize, DataTypes)
db.ItemDtls = require('./itemdtlModel.js')(sequelize, DataTypes)
db.UserWishList  = require('./userwishlistModel.js')(sequelize, DataTypes)
db.UsrImliFrnds = require('./userImliFrndsModel.js')(sequelize, DataTypes)


//relations

db.Newusers.hasMany(db.UsrImliFrnds, {
  foreignKey: "UserID",
  sourceKey: "UserID",
  uniqueKey: "usr_frnd_fk", // foreign key constraint name
  onDelete: "RESTRICT", // ON DELETE config
  onUpdate: "RESTRICT", // ON UPDATE config
  constraints: false, // remove ON DELETE and ON UPDATE constraints
})
db.UsrImliFrnds.belongsTo(db.Newusers, {
  foreignKey: "UserID",
  targetKey: "UserID"
});

db.Newusers.hasOne(db.UserAddress, {
  foreignKey: "UserID",
  sourceKey: "UserID",
  uniqueKey: "addr_user_fk", // foreign key constraint name
  onDelete: "RESTRICT", // ON DELETE config
  onUpdate: "RESTRICT", // ON UPDATE config
  constraints: false, // remove ON DELETE and ON UPDATE constraints
})

db.Newusers.hasMany(db.Occasions, {
  foreignKey: "UpdatedBy",
  sourceKey: "UserID"
  // uniqueKey: "addr_userocc_fk", // foreign key constraint name
  // onDelete: "RESTRICT", // ON DELETE config
  // onUpdate: "RESTRICT", // ON UPDATE config
  // constraints: false, // remove ON DELETE and ON UPDATE constraints
})

db.Newusers.hasOne(db.logins, {
    foreignKey: "UserID",
    sourceKey: "UserID",
    uniqueKey: "addr_user_fk", // foreign key constraint name
    onDelete: "RESTRICT", // ON DELETE config
    onUpdate: "RESTRICT", // ON UPDATE config
    constraints: false, // remove ON DELETE and ON UPDATE constraints
  })
 
db.Newusers.hasMany(db.UserWishList, {
  foreignKey: "UserID",
  sourceKey: "UserID",
  uniqueKey: "usr_wish_fk", // foreign key constraint name
  onDelete: "RESTRICT", // ON DELETE config
  onUpdate: "RESTRICT", // ON UPDATE config
  constraints: false, // remove ON DELETE and ON UPDATE constraints
})
db.UserWishList.belongsTo(db.Newusers, {
  foreignKey: "UserID",
  targetKey: "UserID"
});

db.ItemDtls.belongsTo(db.CategoryDtls, {
  foreignKey: "CategoryID",
  targetKey: "CategoryID"
});
db.CategoryDtls.hasMany(db.ItemDtls, {
foreignKey: "CategoryID",
sourceKey: "CategoryID",
uniqueKey: "catitem_item_fk", // foreign key constraint name
onDelete: "RESTRICT", // ON DELETE config
onUpdate: "RESTRICT", // ON UPDATE config
constraints: false, // remove ON DELETE and ON UPDATE constraints
});
db.ItemDtls.belongsTo(db.Vendors, {
  foreignKey: "VendID",
  targetKey: "VendID"
});
db.Vendors.hasMany(db.ItemDtls, {
foreignKey: "VendID",
sourceKey: "VendID",
uniqueKey: "venditem_item_fk", // foreign key constraint name
onDelete: "RESTRICT", // ON DELETE config
onUpdate: "RESTRICT", // ON UPDATE config
constraints: false, // remove ON DELETE and ON UPDATE constraints
})

db.ItemDtls.hasMany(db.UserWishList, {
  foreignKey: "ItemID",
  sourceKey: "ItemID",
  uniqueKey: "wish_item_fk", // foreign key constraint name
  onDelete: "RESTRICT", // ON DELETE config
  onUpdate: "RESTRICT", // ON UPDATE config
  constraints: false, // remove ON DELETE and ON UPDATE constraints
})

db.UserWishList.belongsTo(db.ItemDtls, {
  foreignKey: "ItemID",
  targetKey: "ItemID",
});


// db.users.hasMany(db.usrfrnds, {
//   foreignKey: "userID",
//   sourceKey: "userID",
//   uniqueKey: "frnds_user_fk", // foreign key constraint name
//   onDelete: "RESTRICT", // ON DELETE config
//   onUpdate: "RESTRICT", // ON UPDATE config
//   constraints: false, // remove ON DELETE and ON UPDATE constraints
// });

// db.users.hasMany(db.useroccs, {
//   foreignKey: "userID",
//   sourceKey: "userID",
//   uniqueKey: "occ_user_fk", // foreign key constraint name
//   onDelete: "RESTRICT", // ON DELETE config
//   onUpdate: "RESTRICT", // ON UPDATE config
//   constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.users.hasMany(db.giftcats, {
//   foreignKey: "userID",
//   sourceKey: "userID",
//   uniqueKey: "gift_user_fk", // foreign key constraint name
//   onDelete: "RESTRICT", // ON DELETE config
//   onUpdate: "RESTRICT", // ON UPDATE config
//   constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.giftcats.hasMany(db.subcats, {
//   foreignKey: "CatID",
//   sourceKey: "CatID",
//   uniqueKey: "gift_sub_fk", // foreign key constraint name
//   onDelete: "RESTRICT", // ON DELETE config
//   onUpdate: "RESTRICT", // ON UPDATE config
//   constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.subcats.hasMany(db.giftcats, {
//   foreignKey: "CatID",  
//   sourceKey: "CatID",  
//   uniqueKey: "gift_sub_fk", // foreign key constraint name
//   onDelete: "RESTRICT", // ON DELETE config
//   onUpdate: "RESTRICT", // ON UPDATE config
//   constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.allcats.hasMany(db.subcats, {
//   foreignKey: "CatID",
//   sourceKey: "CatID",
//   uniqueKey: "gift_cat_fk", // foreign key constraint name
//   onDelete: "RESTRICT", // ON DELETE config
//   onUpdate: "RESTRICT", // ON UPDATE config
//   constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.users.hasOne(db.profileimgs, {
//   foreignKey: "userID",
//   sourceKey: "userID",
//   uniqueKey: "profile_user_fk", // foreign key constraint name
//   onDelete: "RESTRICT", // ON DELETE config
//   onUpdate: "RESTRICT", // ON UPDATE config
//   constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.users.hasOne(db.logins, {
//   foreignKey: "userID",
//   sourceKey: "userID",
//   uniqueKey: "addr_user_fk", // foreign key constraint name
//   onDelete: "RESTRICT", // ON DELETE config
//   onUpdate: "RESTRICT", // ON UPDATE config
//   constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.users.hasOne(db.useraddrs, {
//   foreignKey: "userID",
//   sourceKey: "userID",
//   uniqueKey: "addr_user_fk", // foreign key constraint name
//   onDelete: "RESTRICT", // ON DELETE config
//   onUpdate: "RESTRICT", // ON UPDATE config
//   constraints: false, // remove ON DELETE and ON UPDATE constraints
// })

// db.users.hasOne(db.userdtls, { 
//     foreignKey: "userID",  
//     sourceKey: "userID", 
//     // uniqueKey: "userID",
//     uniqueKey: "dtl_user_fk", // foreign key constraint name
//     onDelete: "RESTRICT", // ON DELETE config
//     onUpdate: "RESTRICT", // ON UPDATE config
//     constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.userdtls.belongsTo(db.users,  {sourceKey: "userID"
//     // foreignKey: "userID",
//     // targetKey: "userID",
//   });

// db.users.hasMany(db.threads, { 
//     foreignKey: "userID",  
//     sourceKey: "userID",  
//     uniqueKey: "usr_thrd_fk", // foreign key constraint name
//     onDelete: "RESTRICT", // ON DELETE config
//     onUpdate: "RESTRICT", // ON UPDATE config
//     constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// // db.threads.belongsTo(db.users, {
// //     foreignKey: "userID",
// //     targetKey: "userID",
// //   });
// db.threads.hasMany(db.users, {
//   foreignKey: "userID",  
//   sourceKey: "userID",  
//   uniqueKey: "thrd_usr_fk", // foreign key constraint name
//   onDelete: "RESTRICT", // ON DELETE config
//   onUpdate: "RESTRICT", // ON UPDATE config
//   constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.users.hasMany(db.threadsuggs, { 
//     foreignKey: "userID",  
//     sourceKey: "userID",  
//     uniqueKey: "usr_sugg_fk", // foreign key constraint name
//     onDelete: "RESTRICT", // ON DELETE config
//     onUpdate: "RESTRICT", // ON UPDATE config
//     constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.threadsuggs.belongsTo(db.users, {
//     foreignKey: "userID",
//     targetKey: "userID",
//   });
// db.threads.hasMany(db.threadsuggs, { 
//     foreignKey: "ThreadID",  
//     sourceKey: "ThreadID",  
//     uniqueKey: "thrd_sugg_fk", // foreign key constraint name
//     onDelete: "RESTRICT", // ON DELETE config
//     onUpdate: "RESTRICT", // ON UPDATE config
//     constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.threadsuggs.belongsTo(db.threads, {
//     foreignKey: "ThreadID",
//     targetKey: "ThreadID",
//   });
// db.threads.hasMany(db.threadimgs, { 
//     foreignKey: "ThreadID",  
//     sourceKey: "ThreadID",  
//     uniqueKey: "thrd_img_fk", // foreign key constraint name
//     onDelete: "RESTRICT", // ON DELETE config
//     onUpdate: "RESTRICT", // ON UPDATE config
//     constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.threadimgs.belongsTo(db.threads, {
//     foreignKey: "ThreadID",
//     targetKey: "ThreadID",
//   })
// db.threads.hasMany(db.supports, { 
//     foreignKey: "ThreadID",  
//     sourceKey: "ThreadID",  
//     uniqueKey: "thrd_supp_fk", // foreign key constraint name
//     onDelete: "RESTRICT", // ON DELETE config
//     onUpdate: "RESTRICT", // ON UPDATE config
//     constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.supports.belongsTo(db.threads, {
//     foreignKey: "ThreadID",
//     targetKey: "ThreadID",
//   })
// db.users.hasMany(db.supports, { 
//     foreignKey: "userID",  
//     sourceKey: "userID",  
//     uniqueKey: "usr_supp_fk", // foreign key constraint name
//     onDelete: "RESTRICT", // ON DELETE config
//     onUpdate: "RESTRICT", // ON UPDATE config
//     constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.supports.belongsTo(db.users, {
//     foreignKey: "userID",
//     targetKey: "userID",
//   });
//   db.users.hasMany(db.supports, { 
//     foreignKey: "SuserID",  
//     sourceKey: "userID",  
//     uniqueKey: "usr_supp_fk", // foreign key constraint name
//     onDelete: "RESTRICT", // ON DELETE config
//     onUpdate: "RESTRICT", // ON UPDATE config
//     constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.supports.belongsTo(db.users, {
//     foreignKey: "SuserID",
//     targetKey: "userID",
//   });
//   db.documents.hasMany(db.supports, { 
//     foreignKey: "DocumentID",  
//     sourceKey: "DocumentID",  
//     uniqueKey: "doc_supp_fk", // foreign key constraint name
//     onDelete: "RESTRICT", // ON DELETE config
//     onUpdate: "RESTRICT", // ON UPDATE config
//     constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.supports.belongsTo(db.documents, {
//     foreignKey: "DocumentID",
//     targetKey: "DocumentID",
//   });
//   db.users.hasMany(db.documents, { 
//     foreignKey: "userID",  
//     sourceKey: "userID",  
//     uniqueKey: "usr_doc_fk", // foreign key constraint name
//     onDelete: "RESTRICT", // ON DELETE config
//     onUpdate: "RESTRICT", // ON UPDATE config
//     constraints: false, // remove ON DELETE and ON UPDATE constraints
// })
// db.documents.belongsTo(db.users, {
//     foreignKey: "userID",
//     targetKey: "userID",
//   });
// db.trdetails.hasMany(db.users, {
//     foreignKey: "userID",  
//     sourceKey: "Tuserid",  
//     uniqueKey: "tr_usr_fk", // foreign key constraint name
//     onDelete: "RESTRICT", // ON DELETE config
//     onUpdate: "RESTRICT", // ON UPDATE config
//     constraints: false, // remove ON DELETE and ON UPDATE constraints
//   });

// db.threadimgs.hasOne(db.threads)
// db.threadimgs.belongsTo(db.threads) 

//sync through sequelize
// db.sequelize.sync({ alter: true } force: false)
db.sequelize.sync({ force: false })
  .then(() => {
    console.log(' re-sync done')
  })

module.exports = db