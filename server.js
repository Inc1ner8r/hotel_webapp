const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set current folder 
app.use(express.static(path.join(__dirname, './public')));

//when client connects
io.on('connection', socket => {
    console.log('new connection')

    //socket.emit('message', 'welcome')

    //broadcast on connect
    //socket.broadcast.emit('message', 'user joined');

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

// const PORT = 5500 || process.env.PORT;

// server.listen(PORT, () => console.log(`Server at ${PORT}`));

app.listen(process.env.PORT || 3000, function () {
    console.log("express server on %d in %s mode", this.address().port, app.settings.env)
})