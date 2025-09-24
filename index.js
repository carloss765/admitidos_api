const express = require('express');
const dotenv = require('dotenv');
const app = express();
const config = require('./config.js');
dotenv.config();

app.listen(config.app.port, () => {
    console.log(`Server is running on port ${config.app.port}`);
});
