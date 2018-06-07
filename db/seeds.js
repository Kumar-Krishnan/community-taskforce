const mongoose = require('mongoose')
const City = require('../models/City')


//Connect to Database
mongoose.connect('mongodb://localhost/community-taskforce')
    .then(()=>{
        console.log("Connected to mongodb")
    })
    .catch((err) => {
        console.log('ERROR', err)
      })

//Remove old City Data
City.remove()
      .then(()=>{
          const city1 = new City({
              name: "Thiruvananthapuram",
              zipcode: 30518,
              description: "A beautiful city on the south western coast of India",
              image: "https://qph.fs.quoracdn.net/main-qimg-13da3fab37b8c256c9c05c964ffb1511.webp"
          })

          const city2 = new City({
              name: "Madurai",
              zipcode: 45234,
              description: "Ancient coastal city in India",
              image: "https://en.wikipedia.org/wiki/Meenakshi_Temple#/media/File:Temple_de_M%C3%AEn%C3%A2ksh%C3%AE01.jpg"
          })

          const citys= [city1,city2]

          return City.insertMany(citys)
      })
      .then(()=>{
          //close the database connection
          mongoose.connection.close()
      })