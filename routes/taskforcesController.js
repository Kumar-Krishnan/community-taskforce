const express = require('express')
const router = express.Router({ mergeParams: true })
const City = require('../models/City')
const Issue = require('../models/Issue')
const Taskforce = require('../models/Taskforce')


router.get('/', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    City.findOne({name: cityName})
    .then((city)=>{
        console.log(city)
        const taskforces = city.issues[issueIndex].taskforces
        res.render('taskforces/index', {taskforces,cityName,issueIndex})
    })
   
})

router.get('/new',(req,res)=>{
    cityName = req.params.cityName
    issuename = City.findOne({name: cityName})
    issueIndex = req.params.issueIndex
    res.render('taskforces/new', {cityName,issueIndex})
})

router.get('/:taskforce', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    taskforceIndex = req.params.taskforce

    City.findOne({name: cityName})
    .then((city)=>{
        taskforce = city.issues[issueIndex].taskforces[taskforceIndex]
        res.render('taskforces/show', {taskforce, cityName, issueIndex, taskforceIndex})
    })
})

router.post('/', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex

    City.findOne({name: cityName})
    .then((city)=>{
        newTaskforce = req.body
        city.issues[issueIndex].taskforces.push(newTaskforce)
        return city.save()
    })
    .then(()=>{
        res.redirect(`/cities/${cityName}/issues/${issueIndex}/taskforces`)
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