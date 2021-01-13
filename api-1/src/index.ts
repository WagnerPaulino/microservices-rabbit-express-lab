import express from "express";
import postRouter from './controllers/post-router';

const app = express();

app.use('/api', [postRouter]);

const server = app.listen(3000);
export default server;