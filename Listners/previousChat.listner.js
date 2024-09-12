const fs = require('fs')
const path = require('path')

module.exports = (room, callback) => {
    let chats = fs.readFileSync(
        path.join(__dirname, '../Database/chat.db.json'),
        'utf-8'
    )
    chats = JSON.parse(chats)
    let roomChat = chats.messages.filter(chat => chat.room === room)

    callback({
        roomChat
    })
}