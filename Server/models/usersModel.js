module.exports = (sequelize, DataTypes) => {

    const Newusers = sequelize.define( "newusers" , {
        UserID: {
            type: DataTypes.CHAR(8),
            allowNull: false,
            unique: true
        },
        UserName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        UserEmailID: {
            type: DataTypes.STRING(50)
        },
        UserMobile: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            unique: true
        },
        UserPicPath: {
            type: DataTypes.STRING 
        },
         
    })
    
    // Newusers.associate = models => {

    //     Newusers.hasMany(models.Occasions, {
    //         foreignKey: "UpdatedBy",
    //         sourceKey: "UserID",
    //         uniqueKey: "addr_userocc_fk", // foreign key constraint name
    //         onDelete: "RESTRICT", // ON DELETE config
    //         onUpdate: "RESTRICT", // ON UPDATE config
    //         constraints: false, // remove ON DELETE and ON UPDATE constraints
    //       })
     
      

    //   Newusers.hasOne(models.UserAddress, {
    //     foreignKey: "UserID",
    //     sourceKey: "UserID",
    //     uniqueKey: "addr_user_fk", // foreign key constraint name
    //     onDelete: "RESTRICT", // ON DELETE config
    //     onUpdate: "RESTRICT", // ON UPDATE config
    //     constraints: false, // remove ON DELETE and ON UPDATE constraints
    //   })
    // };
    Newusers.removeAttribute("id");
    return Newusers
    };