import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.MYSQL_URL);

console.log('Connected to the database.');

export default connection;
