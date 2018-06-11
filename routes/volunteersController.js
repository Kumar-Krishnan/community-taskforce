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
        res.render('volunteers/index', {volunteers,cityName,issueIndex})
    })
   
})

router.get('/new',(req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    taskforceIndex = req.params.taskforceIndex
    res.render('volunteers/new', {cityName,issueIndex,taskforceIndex})
})

router.get('/:volunteer', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    taskforceIndex = req.params.taskforceIndex
    volunteerIndex = req.params.volunteer

    City.findOne({name: cityName})
    .then((city)=>{
        volunteer = city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex]
        res.render('volunteers/show', {volunteer, cityName, issueIndex, volunteerIndex,taskforceIndex})
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

// router.get('/:volunteer/edit', (req,res)=>{
//     cityName = req.params.cityName
//     issueIndex = req.params.issueIndex
//     volunteerIndex = req.params.volunteer

//     City.findOne({name: cityName})
//     .then((city)=>{
//         volunteer = city.issues[issueIndex].volunteers[volunteerIndex]
//         res.render('volunteers/edit',{cityName,issueIndex,volunteerIndex, volunteer})
//     })
// })

// router.put('/:volunteer', (req,res)=>{
//     const cityName = req.params.cityName
//     const issueIndex = req.params.issueIndex
//     const volunteerIndex = req.params.volunteer

//     City.findOne({name: cityName})
//     .then((city)=>{
//         city.issues[issueIndex].volunteers[volunteerIndex] = req.body
//        return city.save()
//     })
//     .then(()=>{
//         res.redirect(`/cities/${cityName}/issues/${issueIndex}/volunteers/${volunteerIndex}`)
//     })
//     .catch((err)=>{
//         console.log(err, "Error")
//     })
// })

// router.delete('/:volunteer', (req,res)=>{
//     const cityName = req.params.cityName
//     const issueIndex = req.params.issueIndex
//     const volunteerIndex = req.params.volunteer

//     City.findOne({name:cityName})
//     .then((city)=>{
//         city.issues[issueIndex].volunteers.splice(volunteerIndex,1)
//         return city.save()
//     })
//     .then(()=>{
//         res.redirect(`/cities/${cityName}/issues/${issueIndex}/volunteers/`)
//     })

// })




module.exports=router