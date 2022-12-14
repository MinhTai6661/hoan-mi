"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Allcode, {
                foreignKey: "gender",
                targetKey: "keyMap",
                as: "genderData",
            });
            User.belongsTo(models.Allcode, {
                foreignKey: "positionId",
                targetKey: "keyMap",
                as: "positionData",
            });

            User.hasOne(models.MarkDown, { foreignKey: "doctorId" });
            User.hasMany(models.Booking, { foreignKey: "patientId", as: "userBooking" });
        }
    }
    User.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            gender: DataTypes.STRING(5),
            address: DataTypes.STRING,
            image: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            roleId: DataTypes.STRING,
            positionId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
