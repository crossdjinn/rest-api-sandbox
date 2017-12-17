angularApp.
config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $routeProvider.
        when('/', {
            template: '<home></home>',
            activetab: 'home',
            activename: 'API routes'
        }).
        when('/task/new', {
            template: '<task-new></task-new>',
            activetab: 'taskNew',
            activename: 'New task'
        }).
        when('/task/list', {
            template: '<task-list></task-list>',
            activetab: 'taskList',
            activename: 'All tasks'
        }).
        when('/task/:id', {
            template: '<task-detail></task-detail>',
            activename: 'Edit task'
        }).
        otherwise('/');
    }
]);