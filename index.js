import express from "express";
import bodyParser from "body-parser";
import connection from "./db.js";
import dotenv from "dotenv";
import schoolRoutes from './school.route.js';

dotenv.config();


const app = express();


app.use(bodyParser.json());

app.use(express.json());
app.use('/', schoolRoutes);



connection.query('SELECT 1')
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server is running at port : ${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server: database not reachable');
        console.error(err.message);
        process.exit(1);
    })