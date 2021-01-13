import { Connection, Channel, connect, Message } from "amqplib";
import { EXCHANGE_NAME, QUEUE_NAME } from "../config/config-server";

export default class RabbitmqServer {
    private conn!: Connection;
    private channel!: Channel;

    constructor(private uri: string) {
    }

    async start(): Promise<void> {
        this.conn = await connect(this.uri);
        console.log("connection " + this.uri);
        this.channel = await this.conn.createChannel();
        await this.channel.assertQueue(QUEUE_NAME);
        await this.channel.assertExchange(EXCHANGE_NAME, "fanout", { durable: false });
        await this.channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, '*');
        console.log("Connection successful");

    }

    async publishInQueue(queue: string, message: string) {
        return this.channel.sendToQueue(queue, Buffer.from(message));
    }

    async publishInExchange(
        exchange: string,
        routingKey: string,
        message: string
    ): Promise<boolean> {
        return this.channel.publish(exchange, routingKey, Buffer.from(message));
    }

    async consume(queue: string, callback: (message: Message) => void) {
        return this.channel.consume(queue, (message) => {
            if (message) {
                callback(message);
                this.channel.ack(message);
            }
        });
    }
}