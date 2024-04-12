const { Pool } = require("pg");
require("dotenv").config();
let {
  pg_host,
  pg_database,
  pg_username,
  pg_password,
  pg_port,
  postgresql_connection_string,
} = process.env;

async function postgreSQLConnection() {
  const pool = new Pool({
    host: pg_host,
    database: pg_database,
    username: pg_username,
    password: pg_password,
    port: pg_port,
  });
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT version()");
    console.log(
      `Successfully connected to postgresql database of version ${result.rows[0]}`
        .bgGreen
    );
  } catch (error) {
    console.log(`Unable to connect due to error ${error}`);
  } finally {
    client.release();
  }
}

const neonDatabaseConnection = async () => {
  const pool = new Pool({
    connectionString: postgresql_connection_string,
  });
  const client = await pool.connect();
  try {
    console.log(`Successfully connected to neon-postgresql database`.bgBlue);
  } catch (error) {
    console.log(`Unable to connect due to error ${error}`.bgRed);
  } finally {
    client.release();
  }
};
module.exports = {
  neonDatabaseConnection: neonDatabaseConnection,
  postgreSQLConnection: postgreSQLConnection,
};
