module.exports = (sequelize, DataTypes) => {

    const ProfileImg = sequelize.define( "profileimgs" , {
        userID: {
            type: DataTypes.CHAR(8),
            allowNull: false,
            primaryKey: true
        },
        UsrSrcPath: {
            type: DataTypes.STRING
        },
        fileName : {
            type: DataTypes.STRING
        },
        type : {
            type: DataTypes.STRING
        },
    })
    
    ProfileImg.removeAttribute("id");
    return ProfileImg
    }