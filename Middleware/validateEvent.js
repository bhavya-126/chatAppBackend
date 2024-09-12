const { joinRoom, messageSchema, groupMsg, createGroup } = require('../Schema/user.schema')


function checkResult(result) {
    if (result.error) {
        throw new Error(result.error)
    }
}

module.exports = ([event, ...args], next) => {
    
    let result
    try {
        if (event === 'join room') {
            result = joinRoom.validate(args[0]);
            checkResult(result)
        } else if (event === 'send message') {
            result = messageSchema.validate(args[0]);
            checkResult(result)
        } else if (event === 'create group') {
            result = createGroup.validate(args[0]);
            checkResult(result)
        } else if (event === 'send group message') {
            result = groupMsg.validate(args[0]);
            checkResult(result)
        }

        next()
    } catch (error) {
        console.log('Error', error);
    }
}