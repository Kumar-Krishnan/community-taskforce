const Schema = require('mongoose').Schema

const taskforceSchema = new Schema({
    name: String,
    missionStatement: String,
    leadOrganizer: String,
    contactEmail: String,
    // skillsPreferred: [String]
    // agents: [agentSchema]
})

module.exports = taskforceSchema