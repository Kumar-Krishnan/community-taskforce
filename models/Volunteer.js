const mongoose = require('mongoose')
const issueSchema = require('../db/schemas/volunteerSchema')

const Volunteer = mongoose.model('volunteer', volunteerSchema)

module.exports = Volunteer