module.exports = (sequelize, DataTypes) => {

    const Newusers = sequelize.define( "newusers" , {
    
        UserEmailID: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        UserName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        UserMobile: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            unique: true
        },
         
    })
    
    
    // Newusers.removeAttribute("id");
    return Newusers
    };