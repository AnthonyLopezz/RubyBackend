import { Router } from "express";
import security from "../middlewares/Security";
import PrivateUserRoute from "./PrivateUserRoute";
import ProfileRoute from "./ProfileRoute";
import UserRoute from "./UserRoute";

export class AppRoutes {
    static get routes(): Router {
      const router = Router();
  
      // Define all principal routes
        router.use("/api/public/users", UserRoute)
        router.use("/api/private/users",  security.verifyToken, PrivateUserRoute)
        router.use("/api/private/profiles",  security.verifyToken, ProfileRoute)




      return router;
    }
  }
  