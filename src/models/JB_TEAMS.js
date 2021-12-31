const connection = require("../../config/db_sequelize");
const DataTypes = require("sequelize");

const teams = connection.define("JB_TEAMS", {
    TEAM_ID: {
        type: DataTypes.INTEGER,
        allowNull:  false,
        primaryKey: true,
        autoIncrement: true
    },
    TEAM_NAME: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    TEAM_BIO: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    TEAM_PRIVATE: {
        type: DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: "N"
    },
    TEAM_PASSWORD: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    TEAM_SIZE: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    TEAM_CITY: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    TEAM_STATE: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    TEAM_COUNTRY: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
});

module.exports = teams;