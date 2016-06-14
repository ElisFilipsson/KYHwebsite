// Get Required packages
var express = require('express'),
    cors = require('cors'),
    moment = require('moment'),
    // Server listening port
    port = process.env.PORT || 4000,
    bodyParser = require('body-parser'),
    app = express(),
    nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


var transporter = nodemailer.createTransport({
     service: 'gmail', // no need to set host or port etc.
     auth: {
         user: 'kyhschool@gmail.com',
         pass: 'kyh123456'}
});

// Require and get json object with all the data
var obj = require('./data/data.json');

// Requires routes
var routeDesktop  = require('./routes/calendar.route')(app, obj);
var routeEmail = require('./routes/email.route')(app, transporter);

// Start server
app.listen(port);
console.log('Listening on port: ' + port);
