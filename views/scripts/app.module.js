var angularApp = angular.module('ngApp', [
    // ...which depends on the `phoneList` module
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ngMaterial',
    'angular-loading-bar',
    'taskList',
    'taskDetail',
    'taskNew',
    'home'
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
]).controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close();
    };
    $scope.href = function (location) {
        if (location === "/") {
            $location.url("/");
        } else {
            $location.url(location);
        }
    };
}).controller('MenuCtrl', function($scope, $mdDialog) {
    $scope.toppings = [
        { name: 'Pepperoni', wanted: true },
        { name: 'Sausage', wanted: false },
        { name: 'Black Olives', wanted: true },
        { name: 'Green Peppers', wanted: false }
    ];

    $scope.settings = [
        { name: 'Wi-Fi', extraScreen: 'Wi-fi menu', icon: 'device:network-wifi', enabled: true },
        { name: 'Bluetooth', extraScreen: 'Bluetooth menu', icon: 'device:bluetooth', enabled: false },
    ];

    $scope.messages = [
        {id: 1, title: "Message A", selected: false},
        {id: 2, title: "Message B", selected: true},
        {id: 3, title: "Message C", selected: true},
    ];
});
