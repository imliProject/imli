module.exports = (sequelize, DataTypes) => {

    const Login = sequelize.define( "logins" , {
        UserID: {
            type: DataTypes.CHAR(8),
            allowNull: false,
            primaryKey: true
        },
        Password: {
            type: DataTypes.STRING(10)
        }
     
    })
    
    
    return Login
    }