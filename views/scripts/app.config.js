angularApp.
config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $routeProvider.
        when('/', {
            template: '<home></home>'
        }).
        when('/task/new', {
            template: '<task-new></task-new>'
        }).
        when('/task/list', {
            template: '<task-list></task-list>'
        }).
        when('/task/:id', {
            template: '<task-detail></task-detail>'
        }).
        otherwise('/');
    }
]);