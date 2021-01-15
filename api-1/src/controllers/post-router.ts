import { Request, Response, Router } from "express";
import { EXCHANGE_NAME, QUEUE_NAME } from "../config/config-server";
import RabbitmqServer from "../rabbitmq/rabbitmq-server";
import { getRepository } from "typeorm";
import { Post } from "../domain/post";

const postRouter = Router();

let rabbit: RabbitmqServer;

const initRabbit = async () => {
    if (rabbit) {
        return;
    }
    rabbit = new RabbitmqServer("amqp://admin:admin@localhost:5672");
    await rabbit.start();
}

postRouter.post('/posts', async (req: Request, res: Response) => {
    await initRabbit();
    await rabbit.publishInExchange(EXCHANGE_NAME, QUEUE_NAME, JSON.stringify(req.body));
    const repository = getRepository(Post);
    return res.send(await repository.save(req.body));
})

export default postRouter;