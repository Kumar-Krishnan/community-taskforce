const Schema = require('mongoose').Schema
const volunteerSchema = new Schema({
    name: String,
    description: String,
    contactNumber: String,
    contactEmail: String
})

module.exports = volunteerSchema