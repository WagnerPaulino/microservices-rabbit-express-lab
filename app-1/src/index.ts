import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import "reflect-metadata";
import { createConnection } from "typeorm";
import postRouter from "./controllers/post-router";
import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const PORT = 3000;
const app = express();

const swaggerOptions: Options = {
  swaggerDefinition: {
    info: {
      title: "microservices-rabbit-express-lab",
      version: "1.0.0",
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: ["**/*-router.ts"],
};
var swaggerSpec = swaggerJSDoc(swaggerOptions);

const init = createConnection().then(async (_connection) => {
  app.use(helmet());
  app.use(bodyParser.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api", [postRouter]);
  const server = app.listen(PORT);
  console.log("Up in " + PORT);
  return { app, server };
});

export default init;
