module.exports = (sequelize, DataTypes) => {

    const orders = sequelize.define("orders", {

        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
         
    })

    orders.removeAttribute("id");
    return orders
}