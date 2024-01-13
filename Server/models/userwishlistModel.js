module.exports = (sequelize, DataTypes) => {

    const UserWishList = sequelize.define( "userwishlist" , {
        UserID: {
            type: DataTypes.CHAR(8),
            allowNull: false 
        },
        CategoryID: {
            type: DataTypes.CHAR(8),
            allowNull: false 
        },
        ItemID: {  
            type: DataTypes.CHAR(8),
            allowNull: false 
        },
        Status: {  
            type: DataTypes.CHAR(1),
            allowNull: false 
        },
    })

    UserWishList.removeAttribute("id");
    return UserWishList
    }