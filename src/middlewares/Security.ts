import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class Security {

  public verifyToken(req: Request, res: Response, next: NextFunction): any {
    if (!req.headers.authorization) {
      res.status(401).json({
        respuesta: "Petición negada por el sistema de seguridad",
      });
    } else {
      try {
        const privateKey = String(process.env.SECRET_KEY);
        const token = req.headers.authorization?.split(" ")[1] as string;
        const data = jwt.verify(token, privateKey);
        req.body.userData = data;
        next();
      } catch (error) {
        res.status(401).json({ respuesta: "Intento de fraude" });
      }
    }
  }

}
const security = new Security();
export default security;
