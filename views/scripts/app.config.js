angularApp.
config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $routeProvider.
        when('/', {
            template: '<home></home>',
            activetab: 'home'
        }).
        when('/task/new', {
            template: '<task-new></task-new>',
            activetab: 'taskNew'
        }).
        when('/task/list', {
            template: '<task-list></task-list>',
            activetab: 'taskList'
        }).
        when('/task/:id', {
            template: '<task-detail></task-detail>'
        }).
        otherwise('/');
    }
]);