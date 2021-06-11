const amqp = require('amqplib/callback_api')

amqp.connect(`amqp://guest:guest@http://35.226.123.69:5672`,(err,connection)=>{
    if(err){
        throw err;
    }
    console.log("conectado")
    connection.createChannel((err,channel)=>{
        if(err){
            throw err;
        }
        let queueName="archioqueue"
        let message =  "Menssagem Enviada 2"
        channel.assertQueue(queueName,{
            durable:false
        })
        channel.sendToQueue(queueName,Buffer.from(message))
        console.log(`Message: ${message}`)
        setTimeout(()=>{
            connection.createChannel()
        },1000)
    })
})