const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const dotenv = require("dotenv");
const {
  postgreSQLConnection,
  neonDatabaseConnection,
} = require("./postgresqlConfiguration");
const { signupRouter, signinRouter } = require("./auth-controller");
const { emailSendingRouter, passwordChangeRouter } = require("./email-handler");
const {
  profilePostRouter,
  profileGetIndividualRouter,
  profileGetAllRouter,
  profileDeleteRouter,
  profileUpdateRouter,
} = require("./profile-controllers");
const mongodbDatabaseConnection = require("./dbConfiguration");
const base_endpoint = process.env.base_api_endpoint;

dotenv.config();
mongodbDatabaseConnection();
neonDatabaseConnection();
app.use(express.json());
app.use(base_endpoint, signupRouter);
app.use(base_endpoint, signinRouter);
app.use(base_endpoint, emailSendingRouter);
app.use(base_endpoint, passwordChangeRouter);

const server_port_no = process.env.server_port_no;
app.get("/", (req, res) => {
  return res.send(
    `Application running successfully on port no ${server_port_no}`
  );
});

server.listen(server_port_no, () => {
  console.log(`Application running successfully on port no ${server_port_no}`);
});
