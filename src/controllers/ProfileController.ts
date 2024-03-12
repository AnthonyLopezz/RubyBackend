import ProfileDao from "../daos/ProfileDao";
import { Response, Request } from "express";

class ProfileController extends ProfileDao {

  public queryOne(req: Request, res: Response): void {
    ProfileController.getProfile(req.params.id, res);
  }

  public query(req: Request, res: Response): void {
    ProfileController.consultarPerfil(res);
  }

  public create(req: Request, res: Response): void {
    ProfileController.createProfile(req.body, res);
  }

  public delete(req: Request, res: Response): void {
    ProfileController.deleteProfile(req.params.id, res);
  }

  public update(req: Request, res: Response): void {
    ProfileController.updateProfile(req.params.id, req.body, res);
  }
}

const profileController = new ProfileController();
export default profileController;
