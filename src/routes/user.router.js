import { Router } from "express";
import users from "../presistencia/dao/user/index.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import validateUser from "../middleware/schemas/schema.user.js";
import { ConnectionClosedEvent } from "mongodb";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

router.post("/", validateUser(), async (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(async (hash) => {
      const usuario = {
        nombre: req.body.nombre,
        password: hash,
        role: req.body.role,
      };
      const valores = await users.save(usuario);
      res.status(200).json(valores);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: err.toString() });
    });
});
router.delete("/:id", async (req, res) => {
  try {
    await users.setDellCarById(req.params.id);
    res.status(200).json({});
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "datos incorrectos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await users.getById(id);
  
    
    if (result === null) {
      throw new Error("No Existe el producto");
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
