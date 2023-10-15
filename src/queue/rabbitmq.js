import { generalRequest } from '../utilities';
import { url, port, entryPoint } from '../notifications/serverNoti';

const amqp = require('amqplib');

const URL = `http://${url}:${port}/${entryPoint}/SMS`;


const QUEUE_NAME = 'notification_queue';

export async function connectToRabbitMQ() {
  const connection = await amqp.connect('amqp://queue_mq'); // Replace with your RabbitMQ server URL
  const channel = await connection.createChannel();

  // Ensure the queue exists
  await channel.assertQueue(QUEUE_NAME, { durable: false });

  return { connection, channel };
}

export async function publishMessage(channel, queueName, message) {
  const strMsg = JSON.stringify(message);
  console.log(`Message sent to the queue: ${strMsg}`);
  const buff = Buffer.from(strMsg);
  console.log(buff);
  channel.sendToQueue(queueName, buff);
}


export function consumeMessage(channel, queueName) {
  return new Promise((resolve,reject) => {
    channel.consume(queueName, (message) => {
      resolve(JSON.parse(message.content.toString()));
    }, { noAck: true })
  });
}

export async function queuePost(ctx) {
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
};

export async function queueGet(ctx) {
  try {
    const { connection, channel } = await connectToRabbitMQ();

    const msg = await consumeMessage(channel, QUEUE_NAME)

    console.log(msg);

    await generalRequest(URL, 'POST', msg)

    await channel.close();
    await connection.close();

    ctx.status = 200;
    ctx.body = msg;
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Error receiving message to the queue: ' + error;
    console.error(error);
  }
}