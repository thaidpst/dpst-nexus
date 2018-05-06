// Get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');


// Hash function
String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

// Initialize application
const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:7000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', true);

    next();
}
app.use(allowCrossDomain);

// Make our db accessible to our router
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:7001/DPSTdatabase');
app.use((req,res,next)=>{
    req.db = db;
    next();
});

// Angular output folder
app.use(express.static(path.join(__dirname, 'app')));


// Use our APIs
const authentication = require('./api/authentication');
const admin = require('./api/admin');
const user = require('./api/user');
// const admin = require('./server/routes/admin');
app.use('/authentication', authentication);
app.use('/admin', admin);
app.use('/user', user);
// app.use('/admin', admin);

// Send all other requests to the Angular app
app.get('*', (req, res)=>{
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