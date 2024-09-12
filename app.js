const express = require('express');
const cors = require('cors');
const http = require('node:http');
const { Server } = require('socket.io');

const userRoute = require('./Routes/user.router');
const chatListner = require('./Listners/chat.listner');
const authentication = require('./Middleware/authentication')

require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200',
}))
app.use('/user', userRoute);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:4200',
    }
});

io.of('/chat').use(authentication)

io.of('/chat').on('connection', (socket) => {
    chatListner(socket, io);
});


httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
