const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set current folder 
app.use(express.static(path.join(__dirname, './')));

//when client connects
io.on('connection', socket => {
    console.log('new connection')

    //broadcast on connect

    //get order text
    socket.on('serverOrder', (text) => {
        io.emit('message', text)
    })

    socket.on('serverAccept', (index) => {
        io.emit('accept', index)
    })
    socket.on('serverReady', (index) => {
        io.emit('ready', index)
    })


});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server at ${PORT}`));

