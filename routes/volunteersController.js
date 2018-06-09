const express = require('express')
const router = express.Router({ mergeParams: true })
const City = require('../models/City')
const Issue = require('../models/Issue')
const Volunteer = require('../models/Volunteer')


router.get('/', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    City.findOne({name: cityName})
    .then((city)=>{
        volunteers = city.issues[issueIndex].volunteers
        res.render('volunteers/index', {volunteers,cityName,issueIndex})
    })
   
})

router.get('/new',(req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    res.render('volunteers/new', {cityName,issueIndex})
})

router.get('/:volunteer', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    volunteerIndex = req.params.volunteer

    City.findOne({name: cityName})
    .then((city)=>{
        volunteer = city.issues[issueIndex].volunteers[volunteerIndex]
        res.render('volunteers/show', {volunteer, cityName, issueIndex, volunteerIndex})
    })
})

router.post('/', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex

    City.findOne({name: cityName})
    .then((city)=>{
        newVolunteer = req.body
        city.issues[issueIndex].volunteers.push(newVolunteer)
        return city.save()
    })
    .then(()=>{
        res.redirect(`/cities/${cityName}/issues/${issueIndex}/volunteers`)
    })
})



module.exports=router