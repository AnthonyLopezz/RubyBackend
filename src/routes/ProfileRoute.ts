import { Router } from "express";
import profileController from "../controllers/ProfileController";

class ProfileRoute {
  public apiRouteProfile: Router;

  constructor() {
    this.apiRouteProfile = Router();
    this.loadRoutes();
  }
  public loadRoutes(): void {
    this.apiRouteProfile.get("/all", profileController.query);
    this.apiRouteProfile.get("/one/:id", profileController.queryOne);
    this.apiRouteProfile.post("/create", profileController.create);
    this.apiRouteProfile.delete("/delete/:id", profileController.delete);
    this.apiRouteProfile.put("/update/:id", profileController.update);
  }
}

const profileRoute = new ProfileRoute();
export default profileRoute.apiRouteProfile;
