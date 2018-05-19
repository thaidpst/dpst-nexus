// Get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

// Initialize application
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Cookie parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//CORS middleware
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'http://localhost:7000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Credentials', true);

  next();
};
app.use(allowCrossDomain);

const cors = require('cors');
app.use(cors());

// Make our db accessible to our router
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:7001/DPSTdatabase');
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Angular output folder
app.use(express.static(path.join(__dirname, 'app')));


// Use our APIs
const authentication = require('./api/authentication');
const admin = require('./api/admin');
const user = require('./api/user');
const cookie = require('./api/cookie');
const form = require('./api/form');
const fileupload = require('./api/fileupload');
app.use('/authentication', authentication);
app.use('/admin', admin);
app.use('/user', user);
app.use('/cookie', cookie);
app.use('/form', form);
app.use('/fileupload', fileupload);

app.get('../', (req, res) => {
  res.sendFile(path.join(__dirname, 'public'));
});
// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

//Set Port
const port = process.env.PORT || '7000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));


// Socket.io realtime update
let io = require('socket.io')(server);
require('./api/socketio')(io);
