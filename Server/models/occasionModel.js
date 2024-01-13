module.exports = (sequelize, DataTypes) => {

    const Occasions = sequelize.define( "occasion" , {
        OccasionDesc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        OccasionStartDate: {  
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        OccasionEndDate: {  
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        UpdatedBy: {
            type: DataTypes.CHAR(8),
            allowNull: false
        },
        OccasionStatus: {
            type: DataTypes.CHAR(1),
            allowNull: false    
        },
    })
    
    // Occasions.associate = models => {
    //    Occasions.BelongsTo(models.Newusers);
    //   };
    Occasions.removeAttribute("id");
    return Occasions
    }