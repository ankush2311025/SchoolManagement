import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2" ;
import dotenv from "dotenv";
import schoolRoutes from './school.route.js';

dotenv.config();

const app = express();

const PORT = process.env.DB_PORT||8000;

app.use(bodyParser.json());


const connection = mysql.createConnection(process.env.MYSQL_URL);


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