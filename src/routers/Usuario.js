import { Router } from "express";
import jwt from "jsonwebtoken"
import db from "../conection/DB.js";

const router = Router()
const Secret_Key= "Clave_secreta"

router.get("/register", (req,res) =>{
     db.query("SELECT * FROM todo_db.usuarios;", (err, results)=>{
        if (err) {
            return res.status(500).json(err);
        }
       return res.json(results);
    });
});

router.post("/register",(req,res) =>{
   
    const {Nombre,Gmail,Password} = req.body;
    if (!Nombre || !Gmail || !Password) {
        
      return res.status(400).json({error:"falta informacion"})
    }

    db.query("INSERT INTO usuarios (Nombre,Gmail,Password) VALUES (?,?,?)",
    [Nombre,Gmail,Password],
    (err,result) =>{
    if (err){
        return res.status(500).json(err);}

    return res.status(201).json({id: result.insertId, Nombre, Gmail, Password});
});
});

router.post("/login", (req,res) =>{
    const {Gmail,Password} = req.body
    if (!Gmail || !Password) {
        return res.status(404).json({error:"Usurio no encontrado"});
    }

    db.query("SELECT * FROM usuarios WHERE  Gmail = ? AND Password = ?",
       [Gmail,Password],
       (err,result)=>{
        if (err) {
            return res.status(500).json({error:err})
        }
         if (result.length === 0) {
                 return res.status(404).json({mensaje: "Usuario no encontrado"});
            } 
     const usuarios =result[0]
     const token = jwt.sign(
        {id: usuarios.idUsuarios, Gmail: usuarios.Gmail},
        Secret_Key,
        {expiresIn: "1h"}
     )
        return res.status(200).json({mensaje:"login exitoso",usuarios:{
            idUsuarios: usuarios.idUsuarios,
            Nombre:usuarios.Nombre,
            Gmail: usuarios.Gmail,
        }, token});
            
     });
});

router.delete("/:idUsuarios", (req,res) =>{
    const {idUsuarios} = req.params;
    db.query("DELETE FROM usuarios WHERE idUsuarios = ?",
        [idUsuarios],
        (err, result)=>{
            if (err) {
                return res.status(500).json(err)
            }
            if (result.affectedRows === 0) {
                 return res.status(404).json({error: "Usuarios no encontrado"});
            }
             return res.status(200).json({mensaje:"Usuario eliminado"});
        }
    );
});

export default router;