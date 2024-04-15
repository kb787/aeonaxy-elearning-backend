require("dotenv").config();
let { pg_username, pg_password, pg_database, pg_port, pg_host } = process.env;

module.exports = {
  development: {
    username: pg_username,
    password: pg_password,
    database: pg_database,
    host: pg_host,
    port: pg_port,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
