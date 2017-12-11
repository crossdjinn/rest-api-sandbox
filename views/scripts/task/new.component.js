angularApp.controller('taskNewController',
    function taskNewController($scope, $routeParams, Task) {
        $scope.options = ['pending', 'ongoing', 'completed'];

        $scope.entry = new Task();

        $scope.add = function() {
            $scope.entry.$save(function() {
                window.history.back();
            });
        };
}).
component('taskNew', {
    templateUrl: '/templates/task/new.template.html'
});