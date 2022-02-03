const connection = require("../../config/db_sequelize");
const DataTypes = require("sequelize");

const users = connection.define("JB_USERS", {
    US_ID: {
        type: DataTypes.INTEGER,
        allowNull:  false,
        primaryKey: true,
        autoIncrement: true
    },
    US_NAME: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: ""
    },
    US_LASTNAME: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    US_IMAGE: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    US_AGE: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    US_EMAIL: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    US_GENRE: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    US_ALLOW_SMS_NOTIFY: {
        type: DataTypes.STRING(1),
        defaultValue: "N",
        allowNull: true
    },
    US_ALLOW_PUSH_NOTIFY: {
        type: DataTypes.STRING(1),
        defaultValue:"N",
        allowNull: true
    },
    US_PASSWORD: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    US_THEME: {
        type: DataTypes.STRING(10),
        defaultValue: "WHITE",
        allowNull: true
    },
    US_LANGUAGE: {
        type: DataTypes.STRING(10),
        defaultValue: "PT-BR",
        allowNull: true
    },
    US_BIO: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    US_CITY: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    US_STATE: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    US_COUNTRY: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    US_COVER: {
        type: DataTypes.STRING,
        allowNull: true
    },
    US_DDD: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    US_PHONE: {
        type: DataTypes.STRING(9),
        allowNull: false
    }

});

module.exports = users;     