module.exports = (sequelize, DataTypes) => {

    const CategoryDtls = sequelize.define( "categorydtls" , {
        CategoryID: {
            type: DataTypes.CHAR(8),
            allowNull: false,
            unique: true
        },
        CategoryName: {
            type: DataTypes.STRING(30),
            allowNull: false 
        },
        CategoryPic: {  
            type: DataTypes.STRING 
        },
         
    })
    
    // Categorydtls.associate = models => {
    //     Categorydtls.BelongsTo(models.ItemDtls);
    //     }
        
    CategoryDtls.removeAttribute("id");
    return CategoryDtls
    }