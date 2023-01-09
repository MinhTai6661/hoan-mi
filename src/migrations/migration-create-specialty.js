"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("specialties", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            /**
             * 
             *   name: DataTypes.STRING,
            descriptionHTML: DataTypes.TEXT,
            descriptionMarkDown: DataTypes.TEXT,
            image: DataTypes.BLOB("long"),
             */
            name: {
                type: Sequelize.STRING,
            },
            descriptionHTML: {
                type: Sequelize.TEXT,
            },
            descriptionMarkDown: {
                type: Sequelize.TEXT,
            },
            image: {
                type: Sequelize.BLOB("long"),
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
        await queryInterface.dropTable("specialties");
    },
};
