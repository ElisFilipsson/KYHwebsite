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
         user: 'ardnassandra13@gmail.com',
         pass: '1q2w3e4R5T6Y'}
});
/*
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'ardnassandra13@gmail.com',
        pass: '1q2w3e4R5T6Y'
    }
};*/
// create reusable transporter object using the default SMTP transport
//var transporter = nodemailer.createTransport(options[defaults]);
//var transporter = nodemailer.createTransport(smtpConfig);
/*var transporter = nodemailer.createTransport({
    transport: 'ses', // loads nodemailer-ses-transport
    accessKeyId: 'AWSACCESSKEY',
    secretAccessKey: 'AWS/Secret/key'
});
var transporter = nodemailer.createTransport(sesTransport({
    accessKeyId: "AWSACCESSKEY",
    secretAccessKey: "AWS/Secret/key",
    rateLimit: 5 // do not send more than 5 messages in a second
}));
var transporter = nodemailer.createTransport(sesTransport(options));*/

// Require and get json object with all the data
var obj = require('./data/data.json');

// Requires routes
var routeDesktop  = require('./routes/calendar.route')(app, obj);
var routeEmail = require('./routes/email.route')(app, transporter);

// Start server
app.listen(port);
console.log('Listening on port: ' + port);
