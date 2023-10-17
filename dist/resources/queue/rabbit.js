"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueGet = exports.queuePost = exports.consumeMessage = exports.publishMessage = exports.connectToRabbitMQ = void 0;
const notification_1 = require("../notification");
const amqp = require("amqplib");
const URL = process.env.NOTIFICATION_API;
const QUEUE_NAME = 'notification_queue';
function connectToRabbitMQ() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield amqp.connect('amqp://localhost'); // Replace with your RabbitMQ server URL
        const channel = yield connection.createChannel();
        // Ensure the queue exists
        yield channel.assertQueue(QUEUE_NAME, { durable: false });
        return { connection, channel };
    });
}
exports.connectToRabbitMQ = connectToRabbitMQ;
function publishMessage(channel, queueName, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const strMsg = JSON.stringify(message);
        console.log(`Message sent to the queue: ${strMsg}`);
        const buff = Buffer.from(strMsg);
        console.log(buff);
        channel.sendToQueue(queueName, buff);
    });
}
exports.publishMessage = publishMessage;
function consumeMessage(channel, queueName) {
    return new Promise((resolve, reject) => {
        channel.consume(queueName, (message) => {
            resolve(JSON.parse(message.content.toString()));
        }, { noAck: true });
    });
}
exports.consumeMessage = consumeMessage;
function queuePost(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { connection, channel } = yield connectToRabbitMQ();
            const message = ctx.request.body; // Assuming the POST request contains JSON data
            yield publishMessage(channel, QUEUE_NAME, message);
            yield channel.close();
            yield connection.close();
            ctx.status = 200;
            ctx.body = 'Message sent to the queue';
        }
        catch (error) {
            ctx.status = 500;
            ctx.body = 'Error sending message to the queue';
            console.error(error);
        }
    });
}
exports.queuePost = queuePost;
function queueGet(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { connection, channel } = yield connectToRabbitMQ();
            const msg = yield consumeMessage(channel, QUEUE_NAME);
            console.log(msg);
            yield notification_1.NotificationsRepositoryImpl.pushSMS(msg);
            yield channel.close();
            yield connection.close();
            ctx.status = 200;
            ctx.body = msg;
        }
        catch (error) {
            ctx.status = 500;
            ctx.body = 'Error receiving message from the queue: ' + error;
            console.error(error);
        }
    });
}
exports.queueGet = queueGet;
