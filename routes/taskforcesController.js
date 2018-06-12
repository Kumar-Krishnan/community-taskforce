const express = require('express')
const router = express.Router({
    mergeParams: true
})
const City = require('../models/City')
const Issue = require('../models/Issue')
const Taskforce = require('../models/Taskforce')


router.get('/', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    City.findOne({
            name: cityName
        })
        .then((city) => {
            const taskforces = city.issues[issueIndex].taskforces
            res.render('taskforces/index', {
                taskforces,
                cityName,
                issueIndex
            })
        })
        .catch((err) => res.send(err))
})

router.get('/new', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    res.render('taskforces/new', {
        cityName,
        issueIndex
    })
})

router.get('/:taskforce', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforce

    City.findOne({
            name: cityName
        })
        .then((city) => {
            const issueName = city.issues[issueIndex].name
            const taskforce = city.issues[issueIndex].taskforces[taskforceIndex]
            res.render('taskforces/show', {
                taskforce,
                cityName,
                issueIndex,
                taskforceIndex,
                issueName
            })
        })
        .catch((err) => res.send(err))
})

router.post('/', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex

    City.findOne({
            name: cityName
        })
        .then((city) => {
            newTaskforce = req.body
            city.issues[issueIndex].taskforces.push(newTaskforce)
            return city.save()
        })
        .then(() => {
            res.redirect(`/cities/${cityName}/issues/${issueIndex}/`)
        })
        .catch((err) => res.send(err))
})

router.get('/:taskforce/edit', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforce

    City.findOne({
            name: cityName
        })
        .then((city) => {
            const taskforce = city.issues[issueIndex].taskforces[taskforceIndex]
            res.render('taskforces/edit', {
                cityName,
                issueIndex,
                taskforceIndex,
                taskforce
            })
        })
        .catch((err) => res.send(err))
})

router.put('/:taskforce', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforce

    City.findOne({
            name: cityName
        })
        .then((city) => {
            const updatedTaskforce = req.body
            city.issues[issueIndex].taskforces[taskforceIndex].name = updatedTaskforce.name
            city.issues[issueIndex].taskforces[taskforceIndex].missionStatement = updatedTaskforce.missionStatement
            city.issues[issueIndex].taskforces[taskforceIndex].leadOrganizer = updatedTaskforce.leadOrganizer
            city.issues[issueIndex].taskforces[taskforceIndex].contactEmail = updatedTaskforce.contactEmail
            return city.save()
        })
        .then(() => {
            res.redirect(`/cities/${cityName}/issues/${issueIndex}/taskforces/${taskforceIndex}`)
        })
        .catch((err) => {
            console.log(err, "Error")
        })
})

router.delete('/:taskforce', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforce

    City.findOne({
            name: cityName
        })
        .then((city) => {
            city.issues[issueIndex].taskforces.splice(taskforceIndex, 1)
            return city.save()
        })
        .then(() => {
            res.redirect(`/cities/${cityName}/issues/${issueIndex}/taskforces/`)
        })
        .catch((err) => res.send(err))

})




module.exports = router