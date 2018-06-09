const express = require('express')
const router = express.Router({ mergeParams: true })
const City = require('../models/City')
const Issue = require('../models/Issue')
const Volunteer = require('../models/Volunteer')


router.get('/', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    City.findOne({name:req.params.cityName})
    .then((city)=>{
        volunteers = city.issues[issueIndex].volunteers
        res.render('volunteers/index', {volunteers,cityName,issueIndex})
    })
   
})

module.exports=router