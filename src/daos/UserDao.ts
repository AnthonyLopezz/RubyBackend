import { Response } from "express";
import jwt from "jsonwebtoken";
import encrypt from "bcryptjs";
import ProfileScheme from "../eschemes/ProfileScheme";
import UserScheme from "../eschemes/UserScheme";

class UserDao {

  protected static async session(params: any, res: Response) {
    const passwd = params.passwordUser;
    const email = params.emailUser;

    UserScheme.findOne({ emailUser: email })
      .populate("codProfile")
      .exec((err, obj) => {
        if (obj) {
          const confirmedKey = encrypt.compareSync(passwd, obj.passwordUser);
          if (confirmedKey) {

            const paylaod = {
              userId: obj._id,
              userEmail: params.emailUser,
              profile: obj.codProfile.profileName
            };
            const key = String(process.env.SECRET_KEY);
            const token = jwt.sign(paylaod, key, { expiresIn: 86400 });
            res.status(200).json({ Token: token });

          } else {
            res.status(400).json({ Response: "Invalid credentials", Error: err });
          }
        } else {
          res.status(400).json({ Response: "Invalid credentials, Empty", Error: err });
        }
      }); //Populate traiga toda la información del perfil.
  }

  protected static async getUser(res: Response): Promise<any> {
    const users = await UserScheme.find().sort({ _id: -1 });
    res.status(200).json(users);
  }

  protected static async createUser(
    email: any,
    params: any,
    res: Response
  ): Promise<any> {
    const profile = String(process.env.PROFILE_BY_DEFAULT);
    const jsonProfile = { profileName: profile };
    const existsProfile = await ProfileScheme.findOne(jsonProfile).exec();

    if (existsProfile) {
      params.codProfile = existsProfile._id;
    } else {
      const createProfile = new ProfileScheme(jsonProfile);
      createProfile.save();
      params.codProfile = createProfile._id;
    }

    const exist = await UserScheme.findOne(email).exec(); // exec? works to professional way. Arrow funtions to personalize your results.
    if (exist) {
      res.status(400).json({ Response: "Email name already exists!" });
    } else {
      params.passwordUser = encrypt.hashSync(params.passwordUser, 10);
      const user = new UserScheme(params);
      user.save((err, obj) => {
        if (err) {
          console.log(err);
          res.status(400).json({ Response: "The user can not be saved." });
        } else {
          const paylaod = {
            userId: obj._id,
            userEmail: params.emailUser,
          };
          const key = String(process.env.SECRET_KEY);
          const token = jwt.sign(paylaod, key, { expiresIn: 86400 });
          res.status(200).json({ Token: token });
        }
      });
    }
  }
  protected static async updateUser(
    identifier: any,
    params: any,
    res: Response
  ): Promise<any> {
    const exist = await UserScheme.findById(identifier).exec(); // exec? works to professional way. Arrow funtions to personalize your results.
    if (exist) {
      UserScheme.findByIdAndUpdate(
        { _id: identifier },
        { $set: params },
        (err: any, obj: any) => {
          if (err) {
            console.log(err);
            res.status(400).json({ Response: "The User can not be updated." });
          } else {
            res
              .status(200)
              .json({ Response: "User updated", old: obj, new: params });
          }
        }
      );
    } else {
      res
        .status(400)
        .json({ Response: "This User not exists cannot be updated" });
    }
  }

  protected static async deleteUser(
    identifier: any,
    res: Response
  ): Promise<any> {
    const exist = await UserScheme.findById(identifier).exec(); // exec? works to professional way. Arrow funtions to personalize your results.
    if (exist) {
      UserScheme.findByIdAndDelete(identifier, (err: any, obj: any) => {
        if (err) {
          console.log(err);
          res.status(400).json({ Response: "The User can not be deleted." });
        } else {
          res.status(200).json({ Response: "User deleted", id: obj._id });
        }
      });
    } else {
      res.status(400).json({ Response: "This User not exists" });
    }
  }


  


}

export default UserDao;
