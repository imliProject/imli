module.exports = (sequelize, DataTypes) => {

    const UsrFrnds = sequelize.define( "usrfrnds" , {
        UserEmailID: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        ToEmailID: {
            type: DataTypes.CHAR(8)
        },
        FromMob: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            unique:"liked_mob",
        },
        ToMob: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            unique:"liked_mob"
        },
        Status: {
            type: DataTypes.CHAR(1)
        },
        
    })
    
    UsrFrnds.removeAttribute("id");
    return UsrFrnds
    }