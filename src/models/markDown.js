"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MarkDown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // MarkDown.hasMany(models.User, { foreignKey: "positionId", as: "positionData" });
            // MarkDown.hasMany(models.User, { foreignKey: "gender", as: "genderData" });
        }
    }
    MarkDown.init(
        {
            contentHTML: DataTypes.TEXT("long"),
            contentMarkDown: DataTypes.TEXT("long"),
            description: DataTypes.TEXT,
            doctorId: DataTypes.INTEGER,
            specialtyId: DataTypes.INTEGER,
            clinicId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "MarkDown",
        }
    );
    return MarkDown;
};
