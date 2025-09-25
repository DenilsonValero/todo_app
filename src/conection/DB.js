import Mysql from "mysql2"

const db = Mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "root",
    password: process.env.DB_PASS ||"Denigvm10",
    database:process.env.DB_NAME || "todo_db"
});

db.connect((err) =>{
    if (err){
        console.log("Error al conectar", err);
        return;
    }
    console.log("base conectada");
    
});

export default db;