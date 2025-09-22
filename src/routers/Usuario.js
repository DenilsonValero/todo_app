import { Router } from "express";
import db from "../../DB.js";

const router = Router()


router.get("/", (req,res) =>{
     db.query("SELECT * FROM todo_db.usuarios;", (err, results)=>{
        if (err) {
            return res.status(500).json(err);
        }
       return res.json(results);
    });
});

router.post("/",(req,res) =>{
   
    const {Nombre,Gmail,Password} = req.body;
    if (!Nombre || !Gmail || !Password) {
        console.log("no se registro el usuario");
        
      return res.status(400).json({error:"falta informacion"})
    }

    db.query("INSERT INTO usuarios (Nombre,Gmail,Password) VALUES (?,?,?)",
    [Nombre,Gmail,Password],
    (err,result) =>{
    if (err){
        console.log("error en el query",err);
        return res.status(500).json(err);}

    return res.status(201).json({id: result.insertId, Nombre, Gmail, Password});
});
});

router.delete("/:idUsuarios", (req,res) =>{
    const {idUsuarios} = req.params;
    db.query("DELETE FROM usuarios WHERE idUsuarios = ?",
        [idUsuarios],
        (err, result)=>{
            if (err) {
                console.log("error al eliminar usuario", err);
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