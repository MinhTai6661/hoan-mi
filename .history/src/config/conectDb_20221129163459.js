const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("hoanmi", "rool", null, {
    host: "localhost",
    dialect: "mysql",
});
