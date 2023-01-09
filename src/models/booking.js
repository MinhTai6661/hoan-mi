"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Booking.belongsTo(models.User, {
                foreignKey: "patientId",
                targetKey: "id",
                as: "userBooking",
            });
            Booking.belongsTo(models.Allcode, {
                foreignKey: "timeType",
                targetKey: "keyMap",
                as: "scheduleTimeData",
            });
        }
    }
    Booking.init(
        {
            statusId: DataTypes.STRING,
            doctorId: DataTypes.INTEGER,
            patientId: DataTypes.INTEGER,
            token: DataTypes.STRING,
            date: DataTypes.DATE,
            birthday: DataTypes.DATE,
            reason: DataTypes.TEXT,
            timeType: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Booking",
        }
    );
    return Booking;
};
