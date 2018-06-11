const mongoose = require('mongoose')
const taskforceSchema = require('../db/schemas/taskforceSchema')

const Taskforce = mongoose.model('volunteer', taskforceSchema)

module.exports = Taskforce