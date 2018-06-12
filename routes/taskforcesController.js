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
        issueName = city.issues[issueIndex].name
        taskforce = city.issues[issueIndex].taskforces[taskforceIndex]
        res.render('taskforces/show', {taskforce, cityName, issueIndex, taskforceIndex, issueName})
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

router.get('/:taskforce/edit', (req,res)=>{
    cityName = req.params.cityName
    issueIndex = req.params.issueIndex
    taskforceIndex = req.params.taskforce

    City.findOne({name: cityName})
    .then((city)=>{
        taskforce = city.issues[issueIndex].taskforces[taskforceIndex]
        res.render('taskforces/edit',{cityName,issueIndex,taskforceIndex, taskforce})
    })
})

router.put('/:taskforce', (req,res)=>{
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforce

    City.findOne({name: cityName})
    .then((city)=>{
        city.issues[issueIndex].taskforces[taskforceIndex] = req.body
       return city.save()
    })
    .then(()=>{
        res.redirect(`/cities/${cityName}/issues/${issueIndex}/taskforces/${taskforceIndex}`)
    })
    .catch((err)=>{
        console.log(err, "Error")
    })
})

router.delete('/:taskforce', (req,res)=>{
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforce

    City.findOne({name:cityName})
    .then((city)=>{
        city.issues[issueIndex].taskforces.splice(taskforceIndex,1)
        return city.save()
    })
    .then(()=>{
        res.redirect(`/cities/${cityName}/issues/${issueIndex}/taskforces/`)
    })

})




module.exports=router