const express = require('express');
var app = express();
const http =  require('http');
const cors = require('cors');
const {Server} = require("socket.io")


app.use(cors());
var server = http.createServer(express)


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`user with id ${socket.id} joined room id ${data}`)
    } )

    

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit('receive_message', data)
    })

    socket.on("disconnect", () => {
        console.log("disconnected", socket.id)
    })
})


server.listen(3001, () => {
    console.log("server up")
})