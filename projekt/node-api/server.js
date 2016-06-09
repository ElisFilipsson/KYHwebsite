// Get Required packages
var express = require('express'),
    cors = require('cors'),
    moment = require('moment'),
    // Server listening port
    port = process.env.PORT || 3001,
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Require and get json object with all the data
var obj = require('./data/data.json');

// Requires routes
var routeDesktop  = require('./routes/calendar.route')(app, obj);

// Start server
app.listen(port);
console.log('Listening on port: ' + port);
