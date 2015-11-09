// Import express to create and configure the HTTP server.
var express = require('express');

// Create a HTTP server app.
var app = express();

// When a user goes to /, return a small help string.
app.get('/', function(req, res) {
  res.send("This is the population API.");
});

// Start the server.
var server = app.listen(8000);