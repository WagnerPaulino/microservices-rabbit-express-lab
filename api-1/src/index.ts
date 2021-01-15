import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import "reflect-metadata";
import { createConnection } from "typeorm";
import postRouter from './controllers/post-router';
const PORT = 3000;
const app = express();

const init = createConnection().then(async _connection => {
    app.use(helmet());
    app.use(bodyParser.json());
    app.use('/api', [postRouter]);
    const server = app.listen(PORT);
    console.log("Up in " + PORT);
    return { app, server };
});

export default init