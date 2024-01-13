module.exports = (sequelize, DataTypes) => {

    const ItemDtls = sequelize.define( "itemdtls" , {
        ItemID: {
            type: DataTypes.CHAR(8),
            allowNull: false,
            unique: true
        },
        ItemName: {
            type: DataTypes.STRING(30),
            allowNull: false 
        },
        ItemPic: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        UnitPrice: {  
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        NoOfItems: {  
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ItemColor: {  
            type: DataTypes.STRING,
            allowNull: false
        },
        VendID: {
        type: DataTypes.CHAR(8),
        allowNull: false
    },
    }) 
     

    ItemDtls.removeAttribute("id");
    return ItemDtls
    }