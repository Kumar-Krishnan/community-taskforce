const mongoose = require('mongoose')
const volunteerSchema = require('../db/schemas/volunteerSchema')

const Volunteer = mongoose.model('volunteer', volunteerSchema)

module.exports = Volunteer