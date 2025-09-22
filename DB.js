import Mysql from "mysql2"

const db = Mysql.createConnection({
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

export default db;