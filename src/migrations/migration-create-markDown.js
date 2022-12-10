"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("MarkDowns", {
            // contentHTML: DataTypes.STRING,
            // contentMarkDown: DataTypes.STRING,
            // doctorId: DataTypes.INTEGER,
            // specialtyId: DataTypes.INTEGER,
            // clinicId: DataTypes.INTEGER,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            contentHTML: {
                allowNull: false,

                type: Sequelize.TEXT("long"),
            },
            contentMarkDown: {
                allowNull: false,

                type: Sequelize.TEXT("long"),
            },
            description: {
                allowNull: true,

                type: Sequelize.TEXT,
            },
            doctorId: {
                allowNull: true,

                type: Sequelize.INTEGER,
            },
            specialtyId: {
                allowNull: true,

                type: Sequelize.INTEGER,
            },
            clinicId: {
                allowNull: true,

                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("MarkDowns");
    },
};
