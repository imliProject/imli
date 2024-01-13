module.exports = (sequelize, DataTypes) => {

    const UserOccassions = sequelize.define( "useroccasion" , {
        UserID: {
            type: DataTypes.CHAR(8),
            allowNull: false
        },
        OccassionID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UsrOccStatus: {  
            type: DataTypes.CHAR(1)
        },
         
    })
    
     

    UserOccassions.removeAttribute("id");
    return UserOccassions
    }