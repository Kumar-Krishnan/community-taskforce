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


module.exports=router