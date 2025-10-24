const mysql = require("mysql");
const config = require("../../config.js");

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

let conection;

function conexionMysql() {
  conection = mysql.createConnection(dbConfig);
  conection.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MySQL");
    }
  });
}

conexionMysql();

function show(tabla) {
  return new Promise((resolve, reject) => {
    conection.query(`SELECT * FROM ${tabla}`, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function info(tabla, id) {
  return new Promise((resolve, reject) => {
    conection.query(
      `SELECT * FROM ${tabla} WHERE id = ?`,
      [id],
      (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

function store(tabla, data) {
  return new Promise((resolve, reject) => {
    conection.query(`INSERT INTO ${tabla} SET ?`, data, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function insert(tabla, data) {
  return new Promise((resolve, reject) => {
    conection.query(`INSERT INTO ${tabla} SET ?`, data, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function update(tabla, data) {
  return new Promise((resolve, reject) => {
    conection.query(
      `UPDATE ${tabla} SET ? WHERE id = ?`,
      [data, data.id],
      (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

function destroy(tabla, data) {
  return new Promise((resolve, reject) => {
    conection.query(
      `DELETE FROM ${tabla} WHERE id = ?`,
      [data.id],
      (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

// Custom query function for flexible database queries
function query(sql, params) {
  return new Promise((resolve, reject) => {
    conection.query(sql, params, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  show,
  info,
  store,
  insert,
  update,
  destroy,
  query,
};
