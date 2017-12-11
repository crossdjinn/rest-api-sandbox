angularApp.controller('taskListController',
    function taskListController($scope, Task) {
        $scope.tasks = Task.query();

        $scope.new = function() {
            window.location.href = ' #/task/new';
        };
}).
component('taskList', {
    templateUrl: '/templates/task/list.template.html'
});