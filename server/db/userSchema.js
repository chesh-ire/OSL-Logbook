const mongoose = require('mongoose')
const { logSchema } = require('./logDataSchema')

const userSchema = new mongoose.Schema({
    usn: String,
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'Member'
    },
    status: {
        type: String,
        default: 'active'
    },
    validated: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date
    },
    lastOut: {
        type: Date
    },
    currentLogStatus: {
        type: Boolean,
        default: 1
    },
    logsData: [logSchema],
    activityStatus: {
        type: Boolean,
        default: false
    }

})

const users = mongoose.model('users', userSchema, 'users')

module.exports = {
    users
}