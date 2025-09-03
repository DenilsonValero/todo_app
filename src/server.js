const express = require ("express")
const server= express()
const port = 8080

server.use(express.json());

server.get("/",(req, res) => {
     res.send("Servidor funcionando")
});

server.listen(port, () => {
    console.log("Servidor iniciando");
    
}); 