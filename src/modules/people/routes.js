const express = require("express");
const respuestas = require("../../red/res.js");
const config = require("../../config.js");
const controller = require("./controller.js");

const router = express.Router();

router.get("/", show);
router.get("/info/:id", info);
router.delete("/destroy", destroy);
router.post("/store", insert);
router.put("/update", update);

async function show(req, res) {
  const items = await controller.show();
  respuestas.success(req, res, items, 200);
}

async function info(req, res) {
  try {
    const item = await controller.info(req.params.id);
    respuestas.success(req, res, item, 200);
  } catch (error) {
    respuestas.error(req, res, error, 500);
  }
}

async function destroy(req, res) {
  try {
    const item = await controller.destroy(req.body);
    respuestas.success(req, res, "Persona eliminada correctamente", 200);
  } catch (error) {
    respuestas.error(req, res, error, 500);
  }
}

async function insert(req, res) {
  try {
    const item = await controller.insert(req.body);
    respuestas.success(req, res, "Persona creada correctamente", 200);
  } catch (error) {
    respuestas.error(req, res, error, 500);
  }
}

async function update(req, res) {
  try {
    const item = await controller.update(req.body);
    respuestas.success(req, res, "Persona actualizada correctamente", 200);
  } catch (error) {
    respuestas.error(req, res, error, 500);
  }
}

module.exports = router;
