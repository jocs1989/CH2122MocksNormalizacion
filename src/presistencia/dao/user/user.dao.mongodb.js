import { Collection, opcionSchema } from "../../models/user.models.js";
import Contenedora from "../../contenedor/contenedora.mongodb.js";


class Carrito extends Contenedora {
  constructor() {
    super(Collection, opcionSchema);
      }
  
}

export default Carrito;
