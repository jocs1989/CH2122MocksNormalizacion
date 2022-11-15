import { Router } from "express";
import users from "../presistencia/dao/user/index.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { validateUser } from "../middleware/schemas/schema.user.js";
import { validateUserResponse } from "../middleware/schemas/schema.user.js";
import { ConnectionClosedEvent } from "mongodb";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

router.post("/", validateUser(), async (req, res, next) => {
  try {
    const usuario = {
      nombre: req.body.nombre,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    };

    res.status(200).json(await users.saveUser(usuario));
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await users.deleteById(req.params.id);
    res.status(200).json({});
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "datos incorrectos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await users.getByIdUser(id);

    if (result === null) {
      throw new Error("No Existe el usuario");
    } else {
      res.status(200).json({ usuario: result });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
  //
});
router.get("/", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await users.getAllUser();

    if (result === null) {
      throw new Error("No Existe el usuario");
    } else {
      res.status(200).json({ usuario: result });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
  //
});

export default router;
