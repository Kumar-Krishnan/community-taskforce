const express = require('express')
const router = express.Router({ mergeParams: true })
const City = require('../models/City')
const Issue = require('../models/Issue')


router.get('/', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex

    res.redirect(`/cities/${cityName}/issues/${issueIndex}/hello/boyashaka`)
})

module.exports=router