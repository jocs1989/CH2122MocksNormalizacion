import { Collection, opcionSchema } from "../../models/chat.models.js";

import Contenedora from "../../contenedor/contenedora.mongodb.js";

class Productos extends Contenedora {
  constructor() {
    super(Collection, opcionSchema);
  }
  async get(object) {
    try {
      return await this.bd.findOne({ "autor.idChat": object.autor.idChat });
    } catch (err) {
      throw new Error(err);
    }
  }

  async setAddMsg(idChat,object) {
    try {
    

      this.updateById({
        id: idChat,
        $push: { carrito: object },
      });
       
    } catch (err) {
      console.log(err);
    }
  }
}

export default Productos;
