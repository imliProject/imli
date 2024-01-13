module.exports = (sequelize, DataTypes) => {

    const UsrImliFrnds = sequelize.define( "userimlifriend" , {
        UserID: {
            type: DataTypes.CHAR(8),
            allowNull: false
        },
        UserFrndsID: {
            type: DataTypes.CHAR(8)
        },
        UserMobile: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            unique:"liked_mob", 
        },
        UserFrndsMobile: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            unique:"liked_mob"
        },
        RequestStatus: {
            type: DataTypes.CHAR(1)
        },
        
    })
    
    UsrImliFrnds.removeAttribute("id");
    return UsrImliFrnds
    }