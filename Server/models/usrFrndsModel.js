module.exports = (sequelize, DataTypes) => {

    const UsrFrnds = sequelize.define( "usrfrnds" , {
        userID: {
            type: DataTypes.CHAR(8),
            allowNull: false
        },
        ToUid: {
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