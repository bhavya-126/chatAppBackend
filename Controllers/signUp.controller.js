const fs = require('node:fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { log } = require('node:console');


function generateId(data) {
    if (data.length === 0) {
        return 1;
    }
    const maxId = Math.max(...data.map((item) => item.id));
    return maxId + 1;
}

function generateToken(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

async function encryptPass(password) {
    return bcrypt.genSalt(10, (err, salt) => {
        return bcrypt.hash(password, salt, (err, hash) => {

            return hash;
        });
    });
}

module.exports = (req, res) => {
    let newUser = req.body;

    try {
        let users = fs.readFileSync(
            path.join(__dirname, '../Database/user.db.json'),
            'utf-8'
        );
        users = JSON.parse(users);

        if (users.data.find((user) => user.email === newUser.email)) {
            res.status(409).json({
                message: 'email already exist',
            });
            return;
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newUser.password, salt)
        newUser.password = hash


        newUser['id'] = generateId(users.data);
        users.data.push(newUser);

        fs.writeFileSync(
            path.join(__dirname, '../Database/user.db.json'),
            JSON.stringify(users),
            'utf-8'
        );
        // res.send(users.data);

        let token = generateToken({ name: newUser.name, email: newUser.email });

        res.status(201).json({
            message: 'user added successfully',
            userId: newUser.id,
            token: token,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
