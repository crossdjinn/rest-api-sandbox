angularApp.controller('taskDetailController',
    function taskDetailController($scope, $routeParams, Task) {
        $scope.options = ['pending', 'ongoing', 'completed'];

        $scope.entry = Task.get({id: $routeParams.taskId}, function(data) {
            $scope.task = data;
        });

        $scope.delete = function() {
            if (window.confirm("Delete? " + $scope.task.name)) {
                $scope.entry.$delete(function() {
                    window.history.back();
                });
            }
        };

        $scope.save = function() {
            $scope.entry.$update(function() {
                window.history.back();
            });
        };
}).
component('taskDetail', {
    templateUrl: '/templates/task/detail.template.html'
});