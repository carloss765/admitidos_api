exports.success = (req, res, mesaje, status) => {
    const statusCode = status || 200;
    const mesajeOk = mesaje || '';
    res.status(status).json({
        status: statusCode,
        mesaje: mesajeOk
    });
};

exports.error = (req, res, mesaje, status) => {
    const statusCode = status || 500;
    const mesajeError = mesaje || 'Internal Server Error';
    res.status(statusCode).json({
        status: 'error',
        mesaje: mesajeError
    });
};
