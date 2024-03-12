import UserDao from "../daos/UserDao";
import { Response, Request } from "express";

class UserController extends UserDao {

  public logIn(req: Request, res: Response): void {
    UserController.session(req.body, res);
  }

  public query(req: Request, res: Response): void {
    UserController.getUser(res);
  }

  public create(req: Request, res: Response): void {
    const email = { emailUser: req.body.emailUser };
    UserController.createUser(email, req.body, res);
  }

  public delete(req: Request, res: Response): void {
    UserController.deleteUser(req.params.id, res);
  }

  public update(req: Request, res: Response): void {
    UserController.updateUser(req.params.id, req.body, res);
  }

}

const userController = new UserController();
export default userController;
