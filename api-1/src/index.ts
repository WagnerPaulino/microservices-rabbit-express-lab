import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import postRouter from './controllers/post-router';
let server;
const PORT = 3000;
const app = express();

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "1",
    database: "test"
})
    .then(async _connection => {
        app.use('/api', [postRouter]);
        server = app.listen(PORT);
        console.log("Up in "+PORT);
    })
    .catch(error => console.log(error));
export default server;