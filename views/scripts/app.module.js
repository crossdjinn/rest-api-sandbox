var angularApp = angular.module('ngApp', [
    // ...which depends on the `phoneList` module
    'ngRoute',
    'ngResource',
    'taskList',
    'taskDetail',
    'taskNew'
]).
factory('Task', ['$resource',
    function($resource) {
        return $resource('tasks/:id', {id: '@_id'}, {
            'query':  {method:'GET', isArray:true},
            'get':    {method:'GET'},
            'update': {method:'PUT'},
            'save':   {method:'POST'},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}
        });
    }
]);
