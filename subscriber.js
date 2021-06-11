const amqp = require('amqplib/callback_api')

amqp.connect(`amqp:http://archio:archio@35.192.146.49:5672`,(err,connection)=>{
    if(err){
        throw err;
    }
    console.log("conectado")
    connection.createChannel((err,channel)=>{
        if(err){
            throw err;
        }
        let queueName="archioqueue"
       
        channel.assertQueue(queueName,{
            durable:false
        })
        channel.consume(queueName,(msg)=>{
            console.log(`Recieved : ${msg.content.toString()}`)
            channel.ack(msg)
        },)
    })
})