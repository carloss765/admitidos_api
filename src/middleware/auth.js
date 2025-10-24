const jwt = require("jsonwebtoken");
const config = require("../config.js");

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: true,
        message: "No token provided",
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({
        error: true,
        message: "Token format invalid",
      });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({
        error: true,
        message: "Token malformatted",
      });
    }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Token invalid or expired",
        });
      }

      req.user = decoded;
      return next();
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "An error occurred during authentication",
    });
  }
}

module.exports = authMiddleware;
