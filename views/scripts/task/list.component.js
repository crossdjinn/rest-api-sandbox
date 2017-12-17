angularApp.controller('taskListController',
    function taskListController($scope, Task, $cookies) {
        $scope.tasks = Task.query();

        $scope.cookie = $cookies.getAll();
        console.log($scope.cookie);

        $scope.new = function() {
            window.location.href = ' #/task/new';
        };
}).
component('taskList', {
    templateUrl: '/templates/task/list.template.html'
});