import express from "express";
import postRouter from './controllers/post-router';

const app = express();

app.use('/api', [postRouter]);

app.listen(3000);