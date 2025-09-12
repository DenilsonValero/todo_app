const express = require("express")
const mysql = require ("mysql2")
const server= express()
const PORT = 8080

server.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Denigvm10",
    database: "todo_db"
});

db.connect((err) =>{
    if (err){
        console.log("Error al conectar", err);
        return;
    }
    console.log("base conectada");
    
});

server.get("/tareas", (req,res) =>{
    db.query("SELECT * FROM todo_db.tareas;", (err, results)=>{
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

server.post("/tareas",(req,res) =>{
   
    const {tareascol} = req.body;
    if (!tareascol) {
        console.log("no lego la tarea");
        
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

server.put("/tareas/:idtareas", (req,res) =>{
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

server.delete("/tareas/:idtareas", (req,res) =>{
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

server.get("/",(req, res) => {
     res.send("Servidor funcionando")
});

server.listen(PORT, () => {
    console.log(`Servidor iniciando en http://localhost:${PORT}`);
    
}); 