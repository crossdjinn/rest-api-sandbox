'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/todoListController'),
        availableRoutes = require('express-list-endpoints');

    app.get('/', function (req, res) {
        res.render(
            'index',
            {
                title:'rest-api-server',
                message: 'All registered routes',
                routes: availableRoutes(app)
            })
    });

    // todoList Routes
    app.route('/tasks')
        .get(todoList.all)
        .post(todoList.create);

    app.route('/tasks/:taskId')
        .get(todoList.read)
        .put(todoList.update)
        .delete(todoList.delete);
};