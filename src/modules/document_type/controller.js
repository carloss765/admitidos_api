const db = require("../../db/mysql.js");

const tabla = "document_type";

function show() {
  return db.show(tabla);
}

function info(id) {
  return db.info(tabla, id);
}

function destroy(body) {
  return db.destroy(tabla, body);
}

function insert(body) {
  return db.insert(tabla, body);
}

function update(body) {
  return db.update(tabla, body);
}

module.exports = {
  show,
  info,
  destroy,
  insert,
  update,
};
