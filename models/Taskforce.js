const mongoose = require('mongoose')
const taskforceSchema = require('../db/schemas/taskforceSchema')

const Taskforce = mongoose.model('taskforce', taskforceSchema)

module.exports = Taskforce