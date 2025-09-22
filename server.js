import express from "express"
import tareasRouter from "./src/routers/tareas.js";
import usuarioRouter from "./src/routers/Usuario.js";
const server= express()
const PORT = 8080

server.use(express.json());



server.use("/tareas", tareasRouter);
server.use("/usuarios", usuarioRouter);

server.get("/",(req, res) => {
     res.send("Servidor funcionando")
});

server.listen(PORT, () => {
    console.log(`Servidor iniciando en http://localhost:${PORT}`);
    
}); 