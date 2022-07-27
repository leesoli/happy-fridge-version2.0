const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const port = 3010;
const path = require('path');
const router = require('./router');

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '../client/dist')))
server.use('/', router);

server.listen(port, console.log('listening to port: ', port))