const mongoose = require('mongoose')
const City = require('../models/City')
const Issue = require('../models/Issue')
// const Volunteer = require('../models/Volunteer')
const Taskforce = require('../models/Taskforce')

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

        const taskforce1 = new Taskforce({
            name: "Shasta wifi cultivators",
            missionStatement: "To organize techies in shasta neighrbood and interface them with city-wide efforts",
            leadOrganizer: "Jame Gandolfini",
            contactEmail: "JG@TVM.com",
            skillsPreferred: ["public speaking", "accounting"]
        })

        const taskforce2 = new Taskforce({
            name: "Archelogical survey team",
            missionStatement: "Our goal is to survey the lands around eastern TVM for any historical structures and alert both government and NGO entities to protect said areas",
            leadOrganizer: "Chanakya",
            contactEmail:"chanman@gmail.com",
            skillsPreferred: ["geological survey", "able bodied", "wilderness trekking"]
        })
        
        // const volunteer1 = new Volunteer({
        //     name: "Jason",
        //     description: "Team lead",
        //     contactNumber: "555-226-8432",
        //     contactEmail: "JTL@gmail.com"
        // })
        
        // const volunteer2 = new Volunteer({
        //     name: "Salome",
        //     description: "Philosopher",
        //     contactNumber: "333-2456-9909",
        //     contactEmail: "NeitzcheWasWeakSauce@gmail.com"
        // })

        const issue1 = new Issue({
            name: "Public Wifi",
            description: "Buddha",
            taskforces: [taskforce1,taskforce2]
        })

        const issue2 = new Issue({
            name: "Hydroponics",
            description: "baby don't hurt me",
            taskforces: [taskforce1,taskforce2]
        })

        const city1 = new City({
            name: "Thiruvananthapuram",
            zipcode: 30518,
            description: "A beautiful city on the south western coast of India",
            image: "https://qph.fs.quoracdn.net/main-qimg-13da3fab37b8c256c9c05c964ffb1511.webp",
            issues: [issue1, issue2]
        })

        const city2 = new City({
            name: "Madurai",
            zipcode: 45234,
            description: "Ancient coastal city in India",
            image: "https://en.wikipedia.org/wiki/Meenakshi_Temple#/media/File:Temple_de_M%C3%AEn%C3%A2ksh%C3%AE01.jpg",
            issues:[issue1, issue2]
        })

        const cities= [city1,city2]

        return City.insertMany(cities)
      })
      .then(()=>{
          //close the database connection
          mongoose.connection.close()
      })