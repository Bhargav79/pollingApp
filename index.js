
const express = require('express');
const mongoose= require('mongoose');
const cors = require('cors');
const body = require('body-parser');
const helmet = require('helmet');




// app setup

const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(helmet());


//CORS setup
app.use(body.json());
app.use(body.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
    });



//loading static files
app.use('/', express.static(path.join(__dirname, 'static/dist')));

//loading api
const api = require('./api/api');

//connecting to database
mongoose.connect(dbconnection);


//Listening to PORT
app.listen(port);

//calling REST-API
api(app,body);





