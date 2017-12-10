var express = require('express'),
    app = express(),
    path = require('path'),
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

app.listen(port);

console.log('*** REST API server started on: http://localhost:' + port);