import { Router } from "express";
import db from "../conection/DB.js";

const router = Router()

router.get("/", (req,res) =>{
     db.query("SELECT * FROM todo_db.tareas;", (err, results)=>{
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

router.post("/",(req,res) =>{
   
    const {tareascol} = req.body;
    if (!tareascol) {
        console.log("no llego la tarea");
        
      return res.status(400).json({error:"falta informacion"})
    }

    db.query("INSERT INTO tareas (tareascol) VALUES (?)",
    [tareascol],
    (err,result) =>{
    if (err){
        console.log("error en el query",err);
        return res.status(500).json(err);}

    return res.status(201).json({id: result.insertId, tareascol, completada: false});
});
});

router.put("/:idtareas", (req,res) =>{
    const {idtareas} =req.params;
    db.query("UPDATE tareas SET completada = NOT completada WHERE idtareas = ?",
        [idtareas],
        (err,result) =>{
        if (err) {
            console.log("error en UPDATE",err);
            return res.status(500).json(err);
        }
             if (result.affectedRows === 0) {
                return res.status(404).json({mensaje: "tarea no encontrada"});
             }
             return res.status(200).json({mensaje:"tarea completada"})
        }
    );
});

router.delete("/:idtareas", (req,res) =>{
    const {idtareas} = req.params;
    db.query("DELETE FROM tareas WHERE idtareas = ?",
        [idtareas],
        (err, result)=>{
            if (err) {
                console.log("error al eliminar tarea", err);
                return res.status(500).json(err)
            }
            if (result.affectedRows === 0) {
                 return res.status(404).json({error: "tarea no encontrada"});
            }
             return res.status(200).json({mensaje:"tarea eliminada"});
        }
    );
});

export default router;