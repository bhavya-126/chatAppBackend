const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, '../Database//user.db.json')
const readUser = () => {
    try {
        const users = fs.readFileSync(
            dbPath,
            'utf-8'
        )
        return JSON.parse(users)
    } catch (err) {
        throw err
    }
}

const writeUser = (user) => {
    try {
        let users = readUser()
        users.data.push(user)
        fs.writeFileSync(
            dbPath,
            JSON.stringify(users),
            'utf-8'
        )
    } catch (err) { 
        throw err
    }
}

module.exports = { readUser, writeUser }