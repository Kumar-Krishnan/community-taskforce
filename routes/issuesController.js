const express = require('express')
const router = express.Router({ mergeParams: true })
const City = require('../models/City')
const Issue = require('../models/Issue')




router.get('/', (req,res, next)=>{
    City.findOne({name:req.params.cityName})
    .then((city)=>{
        const cityName = city.name
        const issues = city.issues
        res.render('issues/index', 
        {
            issues:issues,
            cityName: cityName
        })
    })
})



module.exports=router