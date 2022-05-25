// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();

/* Middleware*/
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
const port = 8000;
app.listen(port,setUp);
function setUp()
{
    console.log('server is running');
    console.log(`running on localhost:${port}`);
}


//the response of a GET request if it made 
app.get('/getAll',(req,res) => {
    console.log('here to get all')
    res.send(projectData);
    projectData={};
});

//POST routes
app.post('/addData',(req,res)=>{

    console.log(req.body);
    projectData = {
        date:req.body.date,
        temp:req.body.temp,
        content:req.body.content,
    }
    

})