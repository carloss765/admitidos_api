const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const routes = require('../index.js');
const facultades = require('./modules/facultades/routes.js');
const config = require('../config.js');

const app = express();

app.use('/api/facultades', facultades);

app.set('port', config.app.port);

module.exports = app;
