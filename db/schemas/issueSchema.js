const Schema = require('mongoose').Schema
// const taskforceSchema = require('./taskforceSchema')

const issueSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: String,
    numberOfVolunteersNeeded: Number,
    volunteers: {
        type: Number,
        default: 0
    }
    // taskforces:[taskforceSchema]
})

module.exports = issueSchema