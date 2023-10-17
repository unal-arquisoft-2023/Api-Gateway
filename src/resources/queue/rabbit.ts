import { NotificationsRepositoryImpl } from '../notification';

import * as amqp from 'amqplib';

const URL = process.env.NOTIFICATION_API;

const QUEUE_NAME = 'notification_queue';

export async function connectToRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost'); // Replace with your RabbitMQ server URL
  const channel = await connection.createChannel();

  // Ensure the queue exists
  await channel.assertQueue(QUEUE_NAME, { durable: false });

  return { connection, channel };
}

export async function publishMessage(channel: amqp.Channel, queueName: string, message: any) {
  const strMsg = JSON.stringify(message);
  console.log(`Message sent to the queue: ${strMsg}`);
  const buff = Buffer.from(strMsg);
  console.log(buff);
  channel.sendToQueue(queueName, buff);
}

export function consumeMessage(channel: amqp.Channel, queueName: string) {
  return new Promise<any>((resolve, reject) => {
    channel.consume(queueName, (message) => {
      resolve(JSON.parse(message.content.toString()));
    }, { noAck: true });
  });
}

export async function queuePost(ctx: any) {

  try {
    const { connection, channel } = await connectToRabbitMQ();
    const message = ctx.request.body; // Assuming the POST request contains JSON data

    await publishMessage(channel, QUEUE_NAME, message);

    await channel.close();
    await connection.close();

    ctx.status = 200;
    ctx.body = 'Message sent to the queue';
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Error sending message to the queue';
    console.error(error);
  }
}

export async function queueGet(ctx: any) {
  try {
    const { connection, channel } = await connectToRabbitMQ();

    const msg = await consumeMessage(channel, QUEUE_NAME);

    console.log(msg);

    await NotificationsRepositoryImpl.pushSMS(msg);

    await channel.close();
    await connection.close();

    ctx.status = 200;
    ctx.body = msg;
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Error receiving message from the queue: ' + error;
    console.error(error);
  }
}
