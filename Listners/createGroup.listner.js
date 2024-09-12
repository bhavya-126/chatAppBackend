const { addGroup } = require('../fs/group.fs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (data, socket) => {
    socket.join(data.room)
    // console.log('create group', room, members);

    let token = socket.handshake.auth.token
    let result = jwt.verify(token, process.env.TOKEN_SECRET)

    addGroup(data.room, result.email, ...data.members)
}