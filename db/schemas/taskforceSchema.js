const Schema = require('mongoose').Schema
// const agentSchema = require('./agentSchema')

const taskforceSchema = new Schema({
    name: String,
    // image: String, stretch goal
    description: String,
    issue: String,
    city: String
    // agents: [agentSchema]
})

module.exports = taskforceSchema