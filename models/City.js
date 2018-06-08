const mongoose = require('mongoose')
const citySchema = require('../db/schemas/citySchema')

const City2 = mongoose.model('city', citySchema)

module.exports = City2