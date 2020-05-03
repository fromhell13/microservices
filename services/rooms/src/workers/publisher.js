const amqp = require('amqplib');

async function publishToQueue(queueName, payload){
    const conn = await amqp.connect('amqp://guest:guest@rabbitmq-service:5672') 
    const ch = await conn.createChannel()
    await ch.assertQueue(queueName, { durable: false });
    await ch.sendToQueue(queueName, Buffer.from(payload))
}

module.exports={
    publishToQueue
}
