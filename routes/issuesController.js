const express = require('express')
const router = express.Router({
    mergeParams: true
})
const City = require('../models/City')
const Issue = require('../models/Issue')




router.get('/', (req, res, next) => {
    City.findOne({
            name: req.params.cityName
        })
        .then((city) => {
            const cityName = city.name
            const issues = city.issues
            res.render('issues/index', {
                issues: issues,
                cityName: cityName
            })
        })
        .catch((err) => res.send(err))
})



router.get('/new', (req, res) => {
    const cityName = req.params.cityName
    res.render('issues/new', {
        cityName
    })
})

router.post('/', (req, res) => {
    const newIssue = new Issue(req.body)
    const cityName = req.params.cityName
    City.findOne({
            name: cityName
        })
        .then((city) => {
            city.issues.push(newIssue)
            return city.save()
        })
        .then(() => {
            res.redirect(`/cities/${cityName}/`)
        })
        .catch((err) => res.send(err))
})

router.get('/:issue', (req, res) => {
    const cityName = req.params.cityName
    City.findOne({
            name: req.params.cityName
        })
        .then((city) => {
            issueIndex = req.params.issue
            issue = city.issues[issueIndex]
            res.render(`issues/show`, {
                issue,
                cityName,
                issueIndex
            })
        })
        .catch((err) => res.send(err))
})

router.get('/:issue/edit', (req, res) => {
    const cityName = req.params.cityName
    City.findOne({
            name: req.params.cityName
        })
        .then((city) => {
            const    issueIndex = req.params.issue
            const issue = city.issues[issueIndex]
            res.render(`issues/edit`, {
                issue,
                cityName,
                issueIndex
            })
        })
        .catch((err) => res.send(err))
})

router.put('/:issue', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issue
    const updatedIssue = req.body
    City.findOne({
            name: req.params.cityName
        })
        .then((city) => {
            city.issues[issueIndex].name = updatedIssue.name
            city.issues[issueIndex].description = updatedIssue.description
            city.issues[issueIndex].tagline = updatedIssue.tagline
            return city.save()

        })
        .then((saved) => {
            res.redirect(`/cities/${cityName}/issues/${issueIndex}`)
        })
        .catch((err) => res.send(err))
})

router.delete('/:issue', (req, res) => {
    const cityName = req.params.cityName
    const issueIndex = req.params.issue

    City.findOne({
            name: req.params.cityName
        })
        .then((city) => {
            city.issues.splice(issueIndex, 1)
            return city.save()
        })
        .then((saved) => {
            res.redirect(`/cities/${cityName}/issues`)
        })
        .catch((err) => res.send(err))

})
module.exports = router