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
    image: String,
    description: String,
    numberOfTaskForcesNeeded: Number,
    numberOfTaskForcesActive: this.taskforces.length,
    progressTowardsGoal: (this.numberOfTaskForcesNeeded/this.numberOfTaskForcesActive)*100,
    taskforce: 6
    // taskforces:[taskforceSchema]
})

module.exports = issueSchema