import mysql from "mysql2/promise";
import "dotenv/config";


const conexion = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    port: process.env.PORT,
    password: process.env.DB_PASSWORD
});

export default conexion;

