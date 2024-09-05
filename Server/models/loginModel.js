module.exports = (sequelize, DataTypes) => {

    const Login = sequelize.define( "logins" , {
        UserEmailID: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING(10)
        }
     
    })
    
    
    return Login
    }