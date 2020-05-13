// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware */
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening(){
    console.log(`server running on localhost: ${port}`);
}

/* Routes */
// Initialize all route with a callback function
app.get("/all", sendData);

// Callback function to complete GET '/all'
function sendData (request, response) {
    response.send(latestData);
}

// Post Route
const data = [];
let latestData = {};

app.post("/add", postData);

function postData (request, response) {
    newEntry = {
        temperature: request.body.temperature,
        date: request.body.date,
        content: request.body.userResponse
    }
    data.push(newEntry);
    latestData = newEntry;
    console.log(data);
    response.send(data);
}