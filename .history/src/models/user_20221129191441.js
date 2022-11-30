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
            // define association here
        }
    }
    User.init(
        typeRole:'ROLE',
                keyRole:'R1',
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            gender: DataTypes.BOOLEAN,
            address: DataTypes.STRING,
            typeRole:DataTypes.STRING,
            keyRole:DataTypes.STRING,
                
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
