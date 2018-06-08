const mongoose = require('mongoose')
const issueSchema = require('../db/schemas/issueSchema')

const Issue2 = mongoose.model('issue', issueSchema)

module.exports = Issue2