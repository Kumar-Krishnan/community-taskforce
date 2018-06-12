const express = require('express')
const router = express.Router()
const City = require('../models/City')


router.get('/', (req, res) => {
    City.find()
        .then((cities) => {
            console.log(cities)
            res.render('cities/index', {
                cities
            })
        })
        .catch((err) => res.send(err))
})

router.get('/new', (req, res) => {
    res.render('cities/new')
})

router.post('/', (req, res) => {
    const newCity = req.body
    City.create(newCity)
        .then(() => {
            res.redirect('/cities')
        })
        .catch((err) => res.send(err))
})

router.get('/:name', (req, res) => {
    City.findOne({
            name: req.params.name
        })
        .then((city) => {
            res.render('cities/show', {
                city
            })
        })
        .catch((err) => res.send(err))
})

router.get('/:name/edit', (req, res) => {
    City.findOne({
            name: req.params.name
        })
        .then((city) => {
            res.render('cities/edit', {
                city
            })
        })
        .catch((err) => res.send(err))
})

router.put("/:name", (req, res) => {
    City.findOne({
            name: req.params.name
        })
        .then((city) => {
            return City.findByIdAndUpdate(city._id, req.body, {
                new: true
            })
        })
        .then((city) => {
            res.redirect(`/cities/${city.name}`)
        })
        .catch((err) => res.send(err))
})

router.delete("/:name", (req, res) => {
    City.findOne({
            name: req.params.name
        })
        .then((city) => {
            return City.findByIdAndRemove(city._id)
        })
        .then(() => {
            res.redirect('/cities')
            alert("city successfully deleted.")
        })
        .catch((err) => res.send(err))
})

module.exports = router
