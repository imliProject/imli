module.exports = (sequelize, DataTypes) => {

    const Vendors = sequelize.define( "vendors" , {
        VendID: {
            type: DataTypes.CHAR(8),
            allowNull: false,
            unique: true
        },
        VendName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        VendEmailID: {
            type: DataTypes.STRING(50)
        },
        VendMobile: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            unique: true
        },
        VendLogoPath: {
            type: DataTypes.STRING 
        },
        VendStatus: {
            type: DataTypes.CHAR(1) 
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
    Vendors.removeAttribute("id");
    return Vendors
    };