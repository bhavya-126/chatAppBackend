const { log, time } = require('node:console');
const fs = require('node:fs');
const path = require('node:path');
const { addChats } = require('../fs/chat.fs')

module.exports = (msgData, callback, socket, io) => {

    try {

        socket.emit('receive message', msgData);
        socket.to(msgData.room).emit('receive message', msgData);

        addChats({ ...msgData, time: new Date() })

        if (typeof callback === 'function') {
            callback({
                message: 'Message sent',
                room: msgData.room,
                message: msgData.message,
                senderEmail: msgData.senderEmail,
                recieverEmail: msgData.recieverEmail
            })
        }
    } catch (e) {
        console.log(e);
    }

}