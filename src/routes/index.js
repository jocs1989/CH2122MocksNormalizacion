import Carrito from "./carrito.router.js";
import Filtro from "./filtro.routes.js";
import Productos from "./pruductos.router.js";
import ProductosTest from "./pruductos.mocks.router.js";

function managerRouter(app){  
    //administrar las rutas del negocio     
    app.use("/api/productos/", Productos);
    app.use("/api/carrito/", Carrito);
    app.use("/api/productos-test/",ProductosTest);
    app.use("*", Filtro);
}

export default managerRouter;