require("dotenv").config();

module.exports = {
  app: {
    port: process.env.PORT || 4000,
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "",
  },
  jwt: {
    secret:
      process.env.JWT_SECRET || "your-secret-key-change-this-in-production",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },
};
