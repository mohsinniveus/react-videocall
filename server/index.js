var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
const socket = require('./lib/socket');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('/home/webrtc/react-videocall/server/server.key'),
  cert: fs.readFileSync('/home/webrtc/react-videocall/server/server.cert')
};

// Create a service (the app object is just a callback).
var app = express();

app.use('/', express.static(`${__dirname}/../client`));


var server = https.createServer({
    key: fs.readFileSync('/home/webrtc/react-videocall/server/server.key'),
    cert: fs.readFileSync('/home/webrtc/react-videocall/server/server.cert'),
    requestCert: false,
    rejectUnauthorized: false
},app);
server.listen(5000);

var io = require('socket.io').listen(server);

io.sockets.on('connection',function (socket) {
    console.log("socket connected");
});