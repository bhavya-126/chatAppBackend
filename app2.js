const express = require('express');
const cors = require('cors');
const http = require('node:http');
const { Server } = require('socket.io');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

const userRoute = require('./Routes/user.router');
const chatListner = require('./Listners/chat.listner');
const authentication = require('./Middleware/authentication')


require('dotenv').config();

const app = express();
const port = 3000;

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



(async () => {
    const pubClient = createClient({ url: "redis://localhost:6379" });
    const subClient = pubClient.duplicate();

    await Promise.all([
        pubClient.connect(),
        subClient.connect()
    ]);

    io.adapter(createAdapter(pubClient, subClient));

    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})()
