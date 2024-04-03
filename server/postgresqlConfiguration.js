const postgres = require("postgres");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config();

let { pg_host, pg_database, pg_username, pg_password, pg_port } = process.env;

const postgreSQLConnection = async () => {
  try {
    const pgConfig = postgres({
      host: pg_host,
      database: pg_database,
      username: pg_username,
      password: pg_password,
      port: pg_port,
      ssl: "require",
    });
    const result = await pgConfig`select version()`;
    console.log(
      `Connection established with postresql database of version ${result[0]}`
        .bgGreen
    );
  } catch (error) {
    console.log(`Unable to connect due to error ${error}`.bgRed);
  }
};
