const { addChats } = require('../fs/chat.fs')

module.exports = (data, socket) => {
    socket.emit('receive message', data);
    socket.to(data.room).emit('receive message', data);
    addChats(data)
}