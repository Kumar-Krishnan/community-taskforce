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
        console.log(city)
    })

})

router.put("/:name", (req,res)=>{
    City.findOne({name:req.params.name})
    .then((city)=>{
        let id = city._id
       return City.findByIdAndUpdate(id, req.body, {new :true})
       console.log(req.body)
       
    })
    .then((city)=>{
        res.redirect(`/cities/${city.name}`)
    })
})

module.exports=router

// City.findById(id)
// .then(()=>{
    
// })
// res.redirect(`/cities/${req.params.name}`)