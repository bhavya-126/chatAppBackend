const { query } = require('express');
const joi = require('joi');

const signUp = {
    body: joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    }),
    query: joi.object({}),
    params: joi.object({})
}

const logIn = {
    body: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    }),
    query: joi.object({}),
    params: joi.object({})
}

const joinRoom = joi.object({
    room: joi.string().required(),
})

const createGroup = joi.object({
    room: joi.string().required(),
    members: joi.array().items(joi.string().email()).required(),
})

const messageSchema = joi.object({
    message: joi.string().required(),
    senderEmail: joi.string().email().required(),
    receiverEmail: joi.string().email().required(),
    room: joi.string().required()
})

const groupMsg = joi.object({
    message: joi.string().required(),
    room: joi.string().required(),
    senderEmail: joi.string().email().required()
})

module.exports = { signUp, logIn, joinRoom, messageSchema, createGroup, groupMsg }