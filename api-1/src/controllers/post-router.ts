import { Request, Response, Router } from "express";
import { EXCHANGE_NAME, QUEUE_NAME } from "../config/config-server";
import RabbitmqServer from "../rabbitmq/rabbitmq-server";
import { getRepository } from "typeorm";
import { Post } from "../domain/post";

const baseUrl = "/posts";

const postRouter = Router();

let rabbit: RabbitmqServer;

const initRabbit = async () => {
  if (rabbit) {
    return;
  }
  rabbit = new RabbitmqServer("amqp://admin:admin@localhost:5672");
  await rabbit.start();
};

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags:
 *       - Post
 *     description: Returns all Posts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Posts
 */
postRouter.get(baseUrl, async (_req: Request, res: Response) => {
  const repository = getRepository(Post);
  return res.send(await repository.find());
});

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags:
 *       - Post
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Save a Post and return it
 */
postRouter.post(baseUrl, async (req: Request, res: Response) => {
  await initRabbit();
  await rabbit.publishInExchange(
    EXCHANGE_NAME,
    QUEUE_NAME,
    JSON.stringify(req.body)
  );
  const repository = getRepository(Post);
  return res.send(await repository.save(req.body));
});

export default postRouter;
