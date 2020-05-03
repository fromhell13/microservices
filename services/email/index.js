const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
function sendEmailTo(recieverEmail) {
  nodemailer.createTestAccount((err, account) => {
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email', port: 587, secure: false, 
        auth: {
          user: account.user,
          pass: account.pass
        }
    });
    
    let mailOptions = {
      from: '"Reservation" <reservation@trivago.com>',
      to: recieverEmail,
      subject: 'New Reservation ✔',
      text: 'There are new reservation coming in.',
      html: '<b>There are new reservation coming in.</b>'
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}

amqp.connect('amqp://guest:guest@rabbitmq-service:5672', function(err, conn) {
  conn.createChannel(function(err, ch) {
    const queueName = 'new-reservation-email';
    ch.assertQueue(queueName, { durable: true });
    
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(queueName, async function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
      
      let receiverEmail = msg.content.toString();
      console.log(receiverEmail)
      //await sendEmailTo(receiverEmail); # Disable
      ch.ack(msg);
      
    }, { noAck: false });
  });
});