const mongoose = require('mongoose')
const issueSchema = require('../db/schemas/issueSchema')

const Issue = mongoose.model('city', issueSchema)

module.exports = Issue