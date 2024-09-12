const fs = require("node:fs")
const path = require("path")

const dbPath = path.join(__dirname, "../Database/chat.db.json")

function getChats() {
    try {
        let chats = fs.readFileSync(
            dbPath,
            "utf-8"
        )
        chats = JSON.parse(chats)
        return chats
    } catch (err) {
        console.log(err);
    }
}

function addChats(msgData) {
    try {
        msgData['time'] = new Date()
        let chats = getChats()
        chats.messages.push(msgData)

        fs.writeFileSync(
            dbPath,
            JSON.stringify(chats),
            "utf-8"
        )

    } catch (err) {
        console.log(err);
    }
}

module.exports = { addChats, getChats }