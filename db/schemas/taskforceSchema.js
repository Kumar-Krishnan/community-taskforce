const Schema = require('mongoose').Schema
const volunteerSchema = require('./volunteerSchema')
const taskforceSchema = new Schema({
    name: String,
    missionStatement: String,
    leadOrganizer: String,
    contactEmail: String,
    skillsPreferred: [String],
    volunteersNeeded: Number,
    volunteersParticipating: [volunteerSchema]
    // agents: [agentSchema]
})

module.exports = taskforceSchema