import { Router } from "express";
import security from "../middlewares/Security";
import PrivateUserRoute from "./PrivateUserRoute";

export class AppRoutes {
    static get routes(): Router {
      const router = Router();
  
      // Define all principal routes
        router.use("/api/private/users",  security.verifyToken, PrivateUserRoute)

      return router;
    }
  }
  