const sendMessageListner = require('./sendMessage.listner')
const joinRoomListner = require('./joinRoom.listner')
const previousChatListner = require('./previousChat.listner')
const createGroupListner = require('./createGroup.listner')
const sendGroupMsgListner = require('./sendGroupMsg.listner')
const getGroupsListner = require('./getGroups.listner')

// const { joinRoom } = require('../Schema/user.schema')
// const { joinRoom, messageSchema, groupMsg, createGroup } = require('../Schema/user.schema')
const validateEvent = require('../Middleware/validateEvent')


module.exports = (socket, io) => {

    console.log('User connected');

    socket.use(validateEvent)

    socket.on('join room', (room, callback) => {
        joinRoomListner(room, callback, socket)
    })

    socket.on('send message', (msgData, callback) => {
        sendMessageListner(msgData, callback, socket, io)

    })

    socket.on('create group', (data) => {

        createGroupListner(data, socket)
    })

    socket.on('send group message', (data) => {
        sendGroupMsgListner(data, socket)
    })

    socket.on('previous chats', previousChatListner)

    socket.on('get groups', (callback) => {
        getGroupsListner(socket, callback)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })

}