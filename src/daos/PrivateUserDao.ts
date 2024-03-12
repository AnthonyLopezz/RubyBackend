
import { Types } from "mongoose";
import { Response } from 'express';

import cifrar from "bcryptjs";
import UserScheme from "../eschemes/UserScheme";

class PrivateUserDao {

   // Crear un usuario
    // ************************************************************************************
    protected static async crearUsuario(correo: any, parametros: any, res: Response): Promise<any> {
        const nom = parametros.nameUserImg;
        delete parametros._id;
        delete parametros.userData;
        parametros.nameUserImg = nom.substring(nom.lastIndexOf("\\") + 1);
        const existe = await UserScheme.findOne(correo).exec();
        if (existe) {
            res.status(400).json({ respuesta: "El correo ya existe" });
        } else {
            parametros.passwordUser = cifrar.hashSync(parametros.passwordUser, 10);
            const objUsuario = new UserScheme(parametros);
            objUsuario.save((miError, obj) => {
                if (miError) {
                    res.status(400).json({ respuesta: 'Error al crear el usuario' });
                } else {
                    res.status(200).json({ id: obj._id });
                }
            });
        }
    }
    // ************************************************************************************


    // Obtener todos los usuarios con toda la información del perfil incluída
    // ************************************************************************************
    protected static async obtenerUsuarios(res: Response): Promise<any> {
        UserScheme.find().sort({ _id: -1 }).populate("codProfile")
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Obtener un solo usuario con toda la información del perfil incluída
    // ************************************************************************************
    protected static async obtenerUnUsuario(identificador: any, res: Response): Promise<any> {
        const jsonUsuarioID = { _id: identificador };
        UserScheme.findOne(jsonUsuarioID) .populate("codProfile")
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Cantidad de usuarios x perfil dado
    // ************************************************************************************
    protected static async cantidadUsuariosEnPerfil(identificadorPerfil: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificadorPerfil)) {
            const llave = { _id: identificadorPerfil };
            const cantidad = await UserScheme.countDocuments({ codProfile: llave });
            res.status(200).json({ respuesta: cantidad });
        } else {
            res.status(400).json({ respuesta: "Identificador incorrecto" });
        }
    }
    // ************************************************************************************


    // Obtener todos los usuarios con un perfil entregado
    // ************************************************************************************
    protected static async obtenerUsuariosPerfil(identificador: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificador)) {
            const llave = { _id: identificador };
            UserScheme.find({ codProfile: llave }).sort({ _id: -1 })
                .populate({ path: "codProfile", select: "profileName" })
                .exec((miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: "Error en la consulta" });
                    } else {
                        res.status(200).json(objeto);
                    }
                });
        } else {
            res.status(400).json({ respuesta: "Identificador incorrecto" });
        }
    }
    // ************************************************************************************


    // Eliminar usuario por identificador
    // ************************************************************************************
    protected static async eliminarUsuario(identificador: any, res: Response): Promise<any> {
        const existe = await UserScheme.findById(identificador).exec();
        if (existe) {
            UserScheme.findByIdAndDelete(identificador, (miError: any, objeto: any) => {
                // UserScheme.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error al eliminar el Usuario" });
                } else {
                    res.status(200).json({ eliminado: objeto });
                }
            });
        } else {
            res.status(400).json({ respuesta: "El usuario NO existe" });
        }
    }
    // ************************************************************************************


    // actualizar usuario por _id
    // ************************************************************************************
    protected static async actualizarUsuario(identificador: string, jsonExterno: any, res: Response): Promise<any> {
        delete jsonExterno._id;
        delete jsonExterno.datosUsuario;
        delete jsonExterno.claveUsuario;
        delete jsonExterno.fechaRegistroUsuario;

        const nom = jsonExterno.nameUserImg;
        jsonExterno.nameUserImg = nom.substring(nom.lastIndexOf("\\") + 1);
        
        const existe = await UserScheme.findById(identificador).exec();
        if (existe) {
            UserScheme.findByIdAndUpdate(
                { _id: identificador },
                { $set: jsonExterno },
                (miError: any, objeto: any) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: 'Error al actualizar el usuario, puede que el correo esté repetido' });
                    } else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
        } else {
            res.status(400).json({ respuesta: "El usuario NO existe" });
        }
    }
    // ************************************************************************************

}

export default PrivateUserDao;
