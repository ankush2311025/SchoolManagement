import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2" ;
import dotenv from "dotenv";
import schoolRoutes from './school.route.js';


const app = express();

const PORT = process.env.DB_PORT||8000;

app.use(bodyParser.json());
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });


  connection.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      return;
    }
    console.log('Connected to the database.');
  });




  app.use(express.json());
  app.use('/', schoolRoutes);


  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

export default connection;