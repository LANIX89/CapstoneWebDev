const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {

    const application = sequelize.define("applications", {


        applicantName: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
    });
    return application
}