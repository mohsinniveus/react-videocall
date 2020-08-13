const https = require('https')
const express = require('express');
const config = require('../config');
const socket = require('./lib/socket');

const app = express();
const server = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
},app);

app.use('/', express.static(`${__dirname}/../client`));

server.listen(config.PORT, () => {
  socket(server);
  console.log('Server is listening at :', config.PORT);
});
