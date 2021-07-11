//ENVIROINTMENTAL VARIABLES
const PORT = process.env.PORT || 3000;


// MODULES
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const ReactDOMServer = require('react-dom/server')
const React = require('react')
const App = require('../src/App')


//DATABASE

// const database = require('./database.js')

//DATABASE INITIATION
//database.initiateDB()


//INITIATE EXPRESS APP
const app = express()
//Parse received JSON data
app.use(bodyParser.json())
//Websites can exchange data
app.use(cors())



//Server-Side-Rendering
app.use('^/$,', (req, res, next) => {
    fs.readFile(path.resolve('./build/index.html', 'utf-8', (err, data) => {
      if(err){
        console.log(err)
        return res.status(500).send("Some error happened")
      }
      return res.send(data.replace(
        `<div id="root"> </div>`, 
        `<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`)
      )
    })) 
})
app.use(express.static(path.resolve(__dirname, '..', 'build')))


//CLIENTS
// app.get('/clients', (req, res) => {
//    res.json("Test")
// })



app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`)
})

