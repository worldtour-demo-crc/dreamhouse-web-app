var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('www'));
app.use(express.static(path.join('www', 'build')));

var port = process.env.PORT || 8200;

app.listen(port);

console.log('Listening at: http://localhost:' + port);