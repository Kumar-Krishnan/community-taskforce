const Schema = require('mongoose').Schema
// const issueSchema = require('./issueSchema')
const citySchema = new Schema ({
    name: {
        type: String,
        // required: true
    },
    zipcode: {
        type: String,
        // required: true 
    },
    description: String,
    image: {
        type: String,
        // required: true
    },
    issues: [issueSchema]
})

module.exports = citySchema