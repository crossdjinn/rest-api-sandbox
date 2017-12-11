angularApp.
config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {

        $routeProvider.
        when('/', {
            template: '<task-list></task-list>'
        }).
        when('/task/new', {
            template: '<task-new></task-new>'
        }).
        when('/task/:taskId', {
            template: '<task-detail></task-detail>'
        }).
        otherwise('/');
    }
]);