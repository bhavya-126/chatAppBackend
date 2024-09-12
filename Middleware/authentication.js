const jwt = require('jsonwebtoken');
const { readUser } = require('../fs/user.fs')
const { getGroups } = require('../fs/group.fs')
require('dotenv').config()

const getRoomId = (senderEmail, receiverEmail) => {
    return [senderEmail, receiverEmail].sort((a, b) => a > b ? 1 : -1).join('-')
}

module.exports = (socket, next) => {
    const token = socket.handshake.auth.token;
    var a
    try {
        let result = jwt.verify(token, process.env.TOKEN_SECRET)
        socket.data.email = result.email;
        let users = readUser().data;
        for (let user of users) {
            let roomId = getRoomId(result.email, user.email);
            socket.join(roomId)
        }

        let groups = getGroups().data
        for (let group of groups) {
            for (let member of group.members) {
                if (member === result.email) {
                    socket.join(group.name)
                    break
                }
            }
        }

        next();
    }
    catch (e) {
        console.log("errrrrrr", e);
    }
}