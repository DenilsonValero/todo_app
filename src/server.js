const express = require("express")
import express from "express"
const msql = require ("mysql2")
const server= express()
const port = 8080

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

server.listen(port, () => {
    console.log("Servidor iniciando");
    
}); 