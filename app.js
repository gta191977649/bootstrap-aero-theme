'use strict';
var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static('./'));
app.get('/', function(req, res) {
    res.sendfile('./index.html');
});

app.listen(8080);