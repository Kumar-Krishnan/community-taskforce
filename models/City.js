const mongoose = require('mongoose')
const citySchema = require('../db/schemas/citySchema')

const City = mongoose.model('city', citySchema)

module.exports = City