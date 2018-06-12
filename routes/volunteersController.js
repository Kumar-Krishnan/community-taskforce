const express = require('express')
const router = express.Router({
    mergeParams: true
})
const City = require('../models/City')
const Issue = require('../models/Issue')
const Taskforce = require('../models/Taskforce')
const Volunteer = require('../models/Volunteer')


router.get('/', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforceIndex
    City.findOne({
            name: cityName
        })
        .then((city) => {
            const volunteers = city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating
            res.render('volunteers/index', {
                volunteers,
                cityName,
                issueIndex,
                taskforceIndex
            })
        })
        .catch((err) => res.send(err))

})

router.get('/new', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforceIndex
    City.findOne({
            name: cityName
        })
        .then((city) => {
            const issueName = city.issues[issueIndex].name
            const taskforceName = city.issues[issueIndex].taskforces[taskforceIndex].name
            res.render('volunteers/new', {
                cityName,
                issueIndex,
                taskforceIndex,
                taskforceName,
                issueName
            })
        })
        .catch((err) => res.send(err))

})

router.get('/:volunteer', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforceIndex
    const volunteerIndex = req.params.volunteer

    City.findOne({
            name: cityName
        })
        .then((city) => {
            const issueName = city.issues[issueIndex].name
            const taskforceName = city.issues[issueIndex].taskforces[taskforceIndex].name
            const volunteer = city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex]
            res.render('volunteers/show', {
                volunteer,
                cityName,
                issueIndex,
                volunteerIndex,
                taskforceIndex,
                issueName,
                taskforceName
            })
        })
        .catch((err) => res.send(err))
})

router.post('/', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforceIndex
    City.findOne({
            name: cityName
        })
        .then((city) => {
            newVolunteer = req.body
            city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating.push(newVolunteer)
            return city.save()
        })
        .then(() => {
            res.redirect(`/cities/${cityName}/issues/${issueIndex}/taskforces/${taskforceIndex}/`)
        })
        .catch((err) => res.send(err))
})

router.get('/:volunteer/edit', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforceIndex
    const volunteerIndex = req.params.volunteer

    City.findOne({
            name: cityName
        })
        .then((city) => {
            const volunteer = city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex]
            res.render('volunteers/edit', {
                cityName,
                issueIndex,
                volunteerIndex,
                volunteer,
                taskforceIndex
            })
        })
        .catch((err) => res.send(err))
})

router.put('/:volunteer', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.issueIndex
    const volunteerIndex = req.params.volunteer
    const updatedVolunteer = req.body
    City.findOne({
            name: cityName
        })
        .then((city) => {
            city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex].name = updatedVolunteer.name
            city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex].description = updatedVolunteer.description
            city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex].contactPhone = updatedVolunteer.contactPhone
            city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating[volunteerIndex].contactEmail = updatedVolunteer.contactEmail
            return city.save()
        })
        .then(() => {
            res.redirect(`/cities/${cityName}/issues/${issueIndex}/taskforces/${taskforceIndex}/volunteers/${volunteerIndex}`)
        })
        .catch((err) => {
        })
        
})

router.delete('/:volunteer', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issueIndex
    const taskforceIndex = req.params.taskforceIndex
    const volunteerIndex = req.params.volunteer

    City.findOne({
            name: cityName
        })
        .then((city) => {
            city.issues[issueIndex].taskforces[taskforceIndex].volunteersParticipating.splice(volunteerIndex, 1)
            return city.save()
        })
        .then(() => {
            res.redirect(`/cities/${cityName}/issues/${issueIndex}/taskforces/${taskforceIndex}/volunteers/`)
        })
        .catch((err) => res.send(err))

})




module.exports = router