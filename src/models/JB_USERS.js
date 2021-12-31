const connection = require("../../config/db_sequelize");
const DataTypes = require("sequelize");
const Teams = require("./JB_TEAMS");

const users = connection.define("JB_USERS", {
    US_ID: {
        type: DataTypes.INTEGER,
        allowNull:  false,
        primaryKey: true,
        autoIncrement: true
    },
    US_TEAM_ID: {
        type: DataTypes.INTEGER
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
    US_PASSAWORD: {
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

});

users.belongsTo(Teams,{foreignKey:"FK_US_TEAM_ID"});

module.exports = users;     