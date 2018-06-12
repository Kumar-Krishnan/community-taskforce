const express = require('express')
const router = express.Router({ mergeParams: true })
const City = require('../models/City')
const Issue = require('../models/Issue')
const Taskforce = require('../models/Taskforce')
const Volunteer = require('../models/Volunteer')


router.get('/', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    taskforceIndex = req.params.taskforceIndex
    City.findOne({name: cityName})
    .then((city)=>{
        volunteers = city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating
        res.render('volunteers/index', {volunteers,cityName,issueIndex,taskforceIndex})
    })
   
})

router.get('/new',(req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    taskforceIndex = req.params.taskforceIndex
    City.findOne({name:cityName})
    .then((city)=>{
        issueName = city.issues[issueIndex].name
        taskforceName = city.issues[issueIndex].taskforces[taskforceIndex].name
        res.render('volunteers/new', {cityName,issueIndex,taskforceIndex, taskforceName, issueName})
    })

})

router.get('/:volunteer', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    taskforceIndex = req.params.taskforceIndex
    volunteerIndex = req.params.volunteer

    City.findOne({name: cityName})
    .then((city)=>{
        issueName = city.issues[issueIndex].name
        taskforceName = city.issues[issueIndex].taskforces[taskforceIndex].name
        volunteer = city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex]
        res.render('volunteers/show', {volunteer, cityName, issueIndex, volunteerIndex,taskforceIndex, issueName,taskforceName})
    })
})

router.post('/', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    taskforceIndex = req.params.taskforceIndex
    City.findOne({name: cityName})
    .then((city)=>{
        newVolunteer = req.body
        city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating.push(newVolunteer)
        return city.save()
    })
    .then(()=>{
        res.redirect(`/cities/${cityName}/issues/${issueIndex}/taskforces/${taskforceIndex}/volunteers`)
    })
})

router.get('/:volunteer/edit', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    taskforceIndex = req.params.taskforceIndex
    volunteerIndex = req.params.volunteer

    City.findOne({name: cityName})
    .then((city)=>{
        volunteer = city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex]
        res.render('volunteers/edit',{cityName,issueIndex,volunteerIndex, volunteer,taskforceIndex})
    })
})

router.put('/:volunteer', (req,res)=>{
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.issueIndex
    const volunteerIndex = req.params.volunteer
    const updatedVolunteer = req.body
    City.findOne({name: cityName})
    .then((city)=>{
        city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex].name = updatedVolunteer.name
        city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex].description = updatedVolunteer.description
        city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex].contactPhone = updatedVolunteer.contactPhone
        city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex].contactEmail = updatedVolunteer.contactEmail
       return city.save()
    })
    .then(()=>{
        res.redirect(`/cities/${cityName}/issues/${issueIndex}/taskforces/${taskforceIndex}/volunteers/${volunteerIndex}`)
    })
    .catch((err)=>{
        console.log(err, "Error")
    })
})

router.delete('/:volunteer', (req,res)=>{
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforceIndex
    const volunteerIndex = req.params.volunteer

    City.findOne({name:cityName})
    .then((city)=>{
        city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating.splice(volunteerIndex,1)
        return city.save()
    })
    .then(()=>{
        res.redirect(`/cities/${cityName}/issues/${issueIndex}/taskforces/${taskforceIndex}/volunteers/`)
    })

})




module.exports=router