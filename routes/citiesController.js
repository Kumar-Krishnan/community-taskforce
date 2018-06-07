const express = require('express')
const router = express.Router()
const City = require('../models/City')

router.get('/', (req,res)=>{
    City.find()
    .then((cities)=>{
        console.log(cities)
        res.render('cities/index', {cities})
    })
    .catch((err) => res.send(err))
})

router.get('/new', (req,res)=>{
    res.render('cities/new')
})

router.post('/', (req,res)=>{
    const newCity = req.body
    City.create(newCity)
    .then(()=>{
        res.redirect('/cities')
    })
})

router.get('/:name', (req, res)=>{
    City.findOne({name:req.params.name})
    .then((city)=>{
        res.render('cities/show', {city})
    })
})

router.get('/:name/edit', (req, res)=>{
    City.findOne({name:req.params.name})
    .then((city)=>{
        res.render('cities/edit' , {city})
    })

})

module.exports=router