const express = require('express');
const router = express.Router();
const respuesta = require('../../red/res.js');

router.get('/', (req, res) => {
    respuesta.success(req, res, 'Facultades', 200);
});

module.exports = router;
