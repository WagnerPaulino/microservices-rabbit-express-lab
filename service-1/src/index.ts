import { QUEUE_NAME } from "./config/config-server";
import RabbitmqServer from "./rabbitmq/rabbitmq-server";

const rabbit = new RabbitmqServer("amqp://admin:admin@localhost:5672");
rabbit.start().then(() => {
    rabbit.consume(QUEUE_NAME, (message) => {
        console.log(message.content.toString());
    }).then(() => console.log("consumiu tudo"));
})