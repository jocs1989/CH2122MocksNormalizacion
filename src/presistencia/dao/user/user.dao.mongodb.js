import { Collection, opcionSchema } from "../../models/user.models.js";
import Contenedora from "../../contenedor/contenedora.mongodb.js";

class Carrito extends Contenedora {
  constructor() {
    super(Collection, opcionSchema);
  }

  async getUsuario(usuario) {
    const filter = { email: usuario.email };
    const respuesta = await this.bd.findOne(filter);
    if (!respuesta) {
      return null;
    }

    return respuesta;
  }
  async saveUser(usuario) {
    console.log("Entro");
    const valores = await this.save(usuario);

    return valores.map((item) => {
      return {
        _id: item._id,
        nombre: item.nombre,
        role: item.role,
        timestamp: item.timestamp,
      };
    })[0];
  }
  async getAllUser() {
    const valores = await this.getAll();

    return valores.map((item) => {
      return {
        _id: item._id,
        nombre: item.nombre,
        email: item.email,
        role: item.role,
        timestamp: item.timestamp,
      };
    });
  }

  async getByIdUser(id) {
    const valores = [await this.getById(id)];

    return valores.map((item) => {
      return {
        _id: item._id,
        nombre: item.nombre,
        email: item.email,
        role: item.role,
        timestamp: item.timestamp,
      };
    })[0];
  }
}

export default Carrito;
