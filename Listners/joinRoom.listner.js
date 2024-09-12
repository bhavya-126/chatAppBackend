const { addGroup } = require("../fs/group.fs");

module.exports = (data, callback, socket) => {

    socket.join(data.room);
    callback({
        message: 'Joined room',
        roomId: data.room,
    });

}