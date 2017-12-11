var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

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
connectCounter = 0;

function filterNullValues(i) {
    return (i!=null);
}

io.on('connection', function(socket){
    console.log(Object.keys(io.sockets.sockets).filter(filterNullValues).length);
    //socket.join('all');
    io.sockets.emit('connectCounter', Object.keys(io.sockets.sockets).filter(filterNullValues).length);
    updateNicknames();

//new user
    socket.on('new user', function(data, callback){

        callback(true);
            socket.nickname = data;
            nicknames[socket.nickname] = {online: true}; //Then we put an object with a variable online

            updateNicknames();

    });

// update all user name

    function updateNicknames(){
        io.sockets.emit('usernames', nicknames);
    }

// send message

    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data, nick: socket.nickname});
    });


//disconnected service

    socket.on('disconnect', function(data){
        io.sockets.emit('connectCounter', Object.keys(io.sockets.sockets).filter(filterNullValues).length);
        console.log(Object.keys(io.sockets.sockets).filter(filterNullValues).length);

        if(!socket.nickname) return;
        nicknames[socket.nickname].online = false; //We dont splie nickname from array but change online state to false
        updateNicknames();
    });
});

http.listen(3000, function(){
    console.log('*** REST API server started on: http://localhost:' + port);
});
