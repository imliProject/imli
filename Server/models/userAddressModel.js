module.exports = (sequelize, DataTypes) => {

    const UserAddress = sequelize.define( "useraddress" , {
        UserID: {
            type: DataTypes.CHAR(8),
            allowNull: false,
        },
        UserHome: {
            type: DataTypes.STRING (50),
            allowNull: false
        },
        UserStreet: {
            type: DataTypes.STRING(50)
        },
        UserDistrict: {
            type: DataTypes.STRING(50)
        },
        UserState: {
            type: DataTypes.STRING(50)
        },
        UserPin: {
            type: DataTypes.STRING(10)
        },
        UserCountry: {
            type: DataTypes.STRING(50)
        },
    })
    
    UserAddress.associate = models => {
    UserAddress.BelongsTo(models.Newusers);
    }
    UserAddress.removeAttribute("id");
    return UserAddress
    }