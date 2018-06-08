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



router.get('/new', (req,res)=>{
    cityName = req.params.cityName
    res.render('issues/new',{cityName})
})

router.post('/', (req,res)=>{
    newIssue = new Issue(req.body)
    cityName = req.params.cityName
    City.findOne({name:cityName})
    .then((city)=>{
        city.issues.push(newIssue)
        return city.save()
    })
    .then(()=>{
        res.redirect(`/cities/${cityName}/issues`)
    })
})

router.get('/:issue', (req,res)=>{
    City.findOne({name:req.params.cityName})
    .then((city)=>{
        console.log(city)
       issueIndex = req.params.issue
       issue = city.issues[issueIndex]
       res.render(`issues/show`,{issue})
    })
})
module.exports=router