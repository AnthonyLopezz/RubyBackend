
import { Router } from "express";
import privateUserController from "../controllers/PrivateUserController";

class PrivateUserRoute {

    public rutaAPI: Router;

    constructor() {
        this.rutaAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaAPI.post('/crear', privateUserController.crear);

        this.rutaAPI.get('/todos', privateUserController.consulta);
        this.rutaAPI.get('/uno/:id', privateUserController.consultaUno);

        this.rutaAPI.get('/todos/:codProfile', privateUserController.consultaXPerfil);
        this.rutaAPI.get('/cantxperfil/:codProfile', privateUserController.cantidadEnPerfil);

        this.rutaAPI.delete('/eliminar/:codUser', privateUserController.eliminar);
        this.rutaAPI.put('/actualizar/:codUser', privateUserController.actualizar);
    }

};

const privateUserRoute = new PrivateUserRoute();
export default privateUserRoute.rutaAPI;