"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "root@123",
    database: "graphql_db",
});
exports.sequelize = sequelize;
