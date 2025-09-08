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
server.get("/",(req, res) => {
     res.send("Servidor funcionando")
});

server.listen(PORT, () => {
    console.log(`Servidor iniciando en //localhot${PORT}`);
    
}); 