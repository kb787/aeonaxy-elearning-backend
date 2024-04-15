const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const dotenv = require("dotenv");
const {
  postgreSQLConnection,
  neonDatabaseConnection,
} = require("./postgresqlConfiguration");
const { signupRouter, signinRouter } = require("./controllers/auth-controller");
const {
  emailSendingRouter,
  passwordChangeRouter,
} = require("./helpers/email-handler");
const {
  profilePostRouter,
  profileGetIndividualRouter,
  profileGetAllRouter,
  profileDeleteRouter,
  profileUpdateRouter,
} = require("./controllers/profile-controllers");
const {
  userEnrollmentRouter,
  getAllCourseRouter,
  postNewCourseRouter,
  deleteCourseRouter,
  getFilteredCourseRouter,
} = require("./controllers/course-controller");
const mongodbDatabaseConnection = require("./config/dbConfiguration");
const base_endpoint = process.env.base_api_endpoint;

dotenv.config();
mongodbDatabaseConnection();
// postgreSQLConnection();
neonDatabaseConnection();
app.use(express.json());

app.use(base_endpoint, signupRouter);
app.use(base_endpoint, signinRouter);
app.use(base_endpoint, emailSendingRouter);
app.use(base_endpoint, passwordChangeRouter);
app.use(base_endpoint, profilePostRouter);
app.use(base_endpoint, profileGetIndividualRouter);
app.use(base_endpoint, profileGetAllRouter);
app.use(base_endpoint, profileUpdateRouter);
app.use(base_endpoint, profileDeleteRouter);
app.use(base_endpoint, userEnrollmentRouter);
app.use(base_endpoint, getAllCourseRouter);
app.use(base_endpoint, postNewCourseRouter);
app.use(base_endpoint, deleteCourseRouter);
app.use(base_endpoint, getFilteredCourseRouter);

const server_port_no = process.env.server_port_no;
app.get("/", (req, res) => {
  return res.send(
    `Application running successfully on port no ${server_port_no}`
  );
});

server.listen(server_port_no, () => {
  console.log(`Application running successfully on port no ${server_port_no}`);
});
