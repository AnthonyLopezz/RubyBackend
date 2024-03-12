import { Response } from "express";
import ProfileScheme from "../eschemes/ProfileScheme";

class ProfileDao {
  /*
  protected static async getProfile(res: Response): Promise<any> {
    const profiles = await ProfileScheme.find().sort({ _id: -1 });
    res.status(200).json(profiles);
  }
  */

  protected static async createProfile( params: any, res: Response ): Promise<any> {
    delete params.userData; //Middleware
    delete params._id;
    const exist = await ProfileScheme.findOne(params).exec(); // exec? works to professional way. Arrow funtions to personalize your results.
    if (exist) {
      res.status(400).json({ Response: "Profile name already exists!" });
    } else {
      const profile = new ProfileScheme(params);
      profile.save((err, obj) => {
        if (err) {
          console.log(err);
          res.status(400).json({ Response: "The profile can not be saved." });
        } else {
          res.status(200).json({ Response: "Profile saved", id: obj._id });
        }
      });
    }
  }

  protected static async updateProfile(
    identifier: any,
    params: any,
    res: Response
  ): Promise<any> {
    console.log(params._id)
    const exist = await ProfileScheme.findById(identifier).exec(); // exec? works to professional way. Arrow funtions to personalize your results.
    if (exist) {
      ProfileScheme.findByIdAndUpdate(
        { _id: identifier },
        { $set: params },
        (err: any, obj: any) => {
          if (err) {
            console.log(err);
            res
              .status(400)
              .json({ Response: "The profile can not be updated." });
          } else {
            res
              .status(200)
              .json({ Response: "Profile updated", new: params });
          }
        }
      );
    } else {
      res
        .status(400)
        .json({ Response: "This profile not exists cannot be updated" });
    }
  }

  protected static async deleteProfile(
    identifier: any,
    res: Response
  ): Promise<any> {
    const exist = await ProfileScheme.findById(identifier).exec(); // exec? works to professional way. Arrow funtions to personalize your results.
    if (exist) {
      ProfileScheme.findByIdAndDelete(identifier, (err: any, obj: any) => {
        if (err) {
          console.log(err);
          res.status(400).json({ Response: "The profile can not be deleted." });
        } else {
          res.status(200).json({ Response: "Profile deleted", id: obj._id });
        }
      });
    } else {
      res.status(400).json({ Response: "This profile not exists" });
    }
  }
  // Consultar los datos de un perfil por un código específico
  // ************************************************************************************
  protected static async getProfile(
    identificador: any,
    res: Response
  ): Promise<any> {
    const jsonPerfil = { _id: identificador };
    const existePerfil = await ProfileScheme.findOne(jsonPerfil).exec();
    if (existePerfil) {
      res.status(200).json(existePerfil);
    } else {
      res
        .status(400)
        .json({ respuesta: "El perfil NO existe con ese identificador" });
    }
  }
  // ************************************************************************************

  // Obtener perfiles con orden y contando la cantidas de usuario que tiene el perfil
  // ************************************************************************************
  protected static async consultarPerfil(res: Response): Promise<any> {
    const datos = await ProfileScheme.aggregate([
      {
        $lookup: {
          from: "User",
          localField: "_id",
          foreignField: "codProfile",
          as: "quantityUsers",
        },
      },
      { $addFields: { quantityUsers: { $size: "$quantityUsers" } } },
    ]).sort({ _id: 1 });
    res.status(200).json(datos);
  }
  // ************************************************************************************
}

export default ProfileDao;
