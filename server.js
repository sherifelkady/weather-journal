// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Routes
app.get('/today-weather-data', (req, res) =>{
    res.send(projectData);
})

app.post('/store-weather-data', (req, res) =>{
    projectData = {...req.body};
    res.send();
})
// Setup Server
app.listen(3000, () => {console.log("server is runing")})