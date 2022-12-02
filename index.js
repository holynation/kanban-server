const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// to allow data transfer between client and server domains
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// setting up socket.uio for real time connection
socketIO.on('connection', (socket) => {
    console.log(`Active: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        socket.disconnect()
        console.log('Offline: A user disconnected');
    });
});

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});