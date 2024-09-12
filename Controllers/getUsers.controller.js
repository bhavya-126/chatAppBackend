const fs = require('node:fs')
const path = require('node:path')


module.exports = (req, res) => {
    try {
        let users = fs.readFileSync(
            path.join(__dirname, '../Database/user.db.json'),
            'utf-8'
        )
        users = JSON.parse(users)

        res.json({
            message: "Users fetched successfully",
            data: users.data
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}