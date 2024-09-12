const { getGroups } = require('../fs/group.fs')


module.exports = (socket, callback) => {
    let groups = getGroups().data

    groups = groups.filter(group => group.members.find((member) => member === socket.data.email))
    if (typeof callback === 'function') {
        callback({
            groups
        })
    }
}