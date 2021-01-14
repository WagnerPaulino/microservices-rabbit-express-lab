import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import postRouter from './controllers/post-router';
const PORT = 3000;
const app = express();

const init = createConnection().then(async _connection => {
    app.use('/api', [postRouter]);
    const server = app.listen(PORT);
    console.log("Up in " + PORT);
    return { app, server };
});

export default init