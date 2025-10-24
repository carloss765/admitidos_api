const express = require('express');
const dotenv = require('dotenv');
const app = require('./src/app.js');
dotenv.config();

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
