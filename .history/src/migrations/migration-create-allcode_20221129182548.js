"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("allcode", {
            /**
         * key: DataTypes.STRING,
            type: DataTypes.STRING,
            value_china: DataTypes.STRING,
            value_vi: DataTypes.STRING,
         * 
         */
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            key: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            value_china: {
                type: Sequelize.STRING,
            },
            value_vi: {
                type: Sequelize.STRING,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("allcode");
    },
};
