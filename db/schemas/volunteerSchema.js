const Schema = require('mongoose').Schema
// const agentSchema = require('./agentSchema')

const volunteerSchema = new Schema({
    name: String,
    // image: String, stretch goal
    description: String,
    contactNumber: Number,
    contactEmail: String
    // agents: [agentSchema]
})

module.exports = volunteerSchema