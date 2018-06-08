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
    progressTowardsGoal: {
        type: Number,
        value: (this.numberOfTaskForcesNeeded/this.taskforces)*100
    },
    taskforces: {
        type: Number,
        default: 0
    }
    // taskforces:[taskforceSchema]
})

module.exports = issueSchema