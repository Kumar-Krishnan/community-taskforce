const Schema = require('mongoose').Schema
// const volunteerSchema = require('./volunteerSchema')
const taskforceSchema = require('./taskforceSchema')
const issueSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    tagline: String,
    taskforces: [taskforceSchema]

})

module.exports = issueSchema