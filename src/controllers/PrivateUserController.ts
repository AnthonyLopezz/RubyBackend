import { Request, Response } from "express";
import PrivateUserDao from "../daos/PrivateUserDao";

class PrivateUserController extends PrivateUserDao {
  public crear(req: Request, res: Response): void {
    const correo = { emailUser: req.body.emailUser };
    PrivateUserController.crearUsuario(correo, req.body, res);
  }

  public consulta(req: Request, res: Response): void {
    PrivateUserController.obtenerUsuarios(res);
  }

  public consultaUno(req: Request, res: Response): void {
    PrivateUserController.obtenerUnUsuario(req.params.id, res);
  }

  public eliminar(req: Request, res: Response): void {
    PrivateUserController.eliminarUsuario(req.params.codUser, res);
  }

  public actualizar(req: Request, res: Response): void {
    PrivateUserController.actualizarUsuario(req.params.codUser, req.body, res);
  }

  public cantidadEnPerfil(req: Request, res: Response): void {
    PrivateUserController.cantidadUsuariosEnPerfil(req.params.codProfile, res);
  }

  public consultaXPerfil(req: Request, res: Response): void {
    PrivateUserController.obtenerUsuariosPerfil(req.params.codProfile, res);
  }
}

const privateUserController = new PrivateUserController();
export default privateUserController;
