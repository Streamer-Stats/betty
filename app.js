var Main = require("./src/main/main")

const main = new Main()
main.run()


    //  rabbitmq.createConnection()
    //     .then(ch => {
    //         rabbitmq.consume(ch, "newPlayer", player => {
    //             console.log(player.username)
    //         })
    //     })


// amqp.connect('amqp://guest:guest@localhost:5672', function (err, conn) {

//     conn.createChannel(function (err, ch) {
//         let queue = "newPlayer"
//         ch.assertQueue(queue, { durable: false });
//         ch.prefetch(1);
//         console.log(" [*] Waiting for messages in %s. To exit press CTRL+C");

        
//         ch.consume(queue, function (msg) {
           
//             let player  = JSON.parse(msg.content.toString())
//             mongo.insertNewUser("BANOFFE")
//             console.log(player.username)

//         }, { noAck: true });
//     });
// });