var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    port = process.env.PORT || 3000,
    cookie = require('cookie'),
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //created model loading here
    bodyParser = require('body-parser'),
    session = require("express-session")({
        secret: "my-secret",
        resave: true,
        saveUninitialized: true
    }),
    sharedSession = require("express-socket.io-session");


app.use(session);

io.use(sharedSession(session, {
    autoSave:true
}));

mongoose.Promise = global.Promise;
// TODO: solve multiple databases promise
var promise = mongoose.connect('mongodb://localhost/Tododb', {
    useMongoClient: true
});

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app);

nicknames = {};

function filterNullValues(i) {
    return (i!=null);
}

io.on('connection', function(socket){
    // TODO: create model for rooms: socket.join('all');
    io.sockets.emit('connectCounter', Object.keys(io.sockets.sockets).filter(filterNullValues).length);

    updateNicknames();

    socket.on('new user', function(data, callback){
        callback(true);
            socket.nickname = "<b>" + data.name + "</b><br> pub " + data.publicIp + "<br> priv " + data.privateIp;
            nicknames[socket.nickname] = {online: true}; //Then we put an object with a variable online

            updateNicknames();
    });

    function updateNicknames(){
        io.sockets.emit('usernames', nicknames);
    }

    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data, nick: socket.nickname});
    });

    socket.on('disconnect', function(data){
        io.sockets.emit('connectCounter', Object.keys(io.sockets.sockets).filter(filterNullValues).length);

        if(!socket.nickname) return;
        nicknames[socket.nickname].online = false; //We dont splie nickname from array but change online state to false

        updateNicknames();
    });
});

http.listen(3000, function(){
    console.log('*** REST API server started on: http://localhost:' + port);
});
