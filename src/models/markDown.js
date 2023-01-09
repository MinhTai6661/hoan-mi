"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MarkDown extends Model {
        static associate(models) {
            MarkDown.belongsTo(models.User, { foreignKey: "doctorId", targetKey: "id" });
            // MarkDown.hasOne(models.User,{foreignKey:'specialtyId'})
        }
    }
    MarkDown.init(
        {
            contentHTML: DataTypes.TEXT("long"),
            contentMarkDown: DataTypes.TEXT("long"),
            description: DataTypes.TEXT,
            doctorId: DataTypes.INTEGER,
            specialtyId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "MarkDown",
        }
    );
    return MarkDown;
};
