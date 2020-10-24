var amqp = require('amqplib/callback_api');

class RabbitMQ {
    constructor(user, password, host) {
        this.user = user;
        this.password = password
        this.host = host
        this.conn;
        this.ch;
        
    }

    createConnection =  queue => {
        return new Promise((resolve, reject ) => {
            amqp.connect(`amqp://${this.user}:${this.password}@${this.host}:5672`,  (err, conn) => {
                conn.createChannel(function (err, ch) {
                    ch.assertQueue(queue, { durable: false });
                    ch.prefetch(1);
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C");
                    resolve(ch)
                });
            });
        })


    }

    

    consume = (ch, queue, callback) => {
        ch.consume(queue, function (msg) {
            callback(JSON.parse(msg.content.toString()))
        }, { noAck: true });
    }
}


module.exports = RabbitMQ