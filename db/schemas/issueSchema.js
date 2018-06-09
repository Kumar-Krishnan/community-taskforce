const Schema = require('mongoose').Schema
const volunteerSchema = require('./volunteerSchema')

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
    volunteersAmount: {
        type: Number,
        default: 0
    },
    volunteers: [volunteerSchema]

})

module.exports = issueSchema