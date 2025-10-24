const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const config = require("./config.js");

const auth = require("./modules/auth/routes.js");
const facultades = require("./modules/facultades/routes.js");
const levels = require("./levels/routes.js");
const programs = require("./modules/programs/routes.js");
const documentType = require("./modules/document_type/routes.js");
const period = require("./modules/period/routes.js");
const admissionStatus = require("./modules/admission_status/routes.js");
const admissions = require("./modules/admissions/routes.js");
const people = require("./modules/people/routes.js");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", auth);
app.use("/api/facultades", facultades);
app.use("/api/levels", levels);
app.use("/api/programs", programs);
app.use("/api/document-type", documentType);
app.use("/api/period", period);
app.use("/api/admission-status", admissionStatus);
app.use("/api/admissions", admissions);
app.use("/api/people", people);

app.set("port", config.app.port);

module.exports = app;
