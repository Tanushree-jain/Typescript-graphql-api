import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "root@123",
    database: "graphql_db",
});

export { sequelize };
