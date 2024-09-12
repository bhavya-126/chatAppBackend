const fs = require("node:fs")
const path = require("path")

const dbPath = path.join(__dirname, "../Database/groups.db.json")

function getGroups() {
    try {
        let groups = fs.readFileSync(dbPath, 'utf-8')
        groups = JSON.parse(groups)
        return groups
    }
    catch (err) {
        console.log(err);
    }
}

function addGroup(groupName, ...members) {
    try {
        let details = {
            name: groupName,
            members: [...members]
        }

        let groups = getGroups()

        if (groups.data.find(group => group.name === groupName)) {
            console.log("group name already exists");
            return
        } else {
            groups.data.push(details);
            fs.writeFileSync(dbPath, JSON.stringify(groups))
        }

    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { getGroups, addGroup }