angularApp.controller('taskDetailController',
    function taskDetailController($scope, $routeParams, $mdToast, $mdDialog, Task) {
        $scope.options = ['pending', 'ongoing', 'completed'];

        $scope.entry = Task.get({id: $routeParams.id}, function(data) {
            $scope.task = data;
        });

        $scope.delete = function(ev) {
            var confirm = $mdDialog.confirm()
                .title("Really delete task?")
                .textContent($scope.task.name)
                .targetEvent(ev)
                .ok('OK')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                $scope.entry.$delete(function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Task deleted")
                            .position("bottom right")
                            .hideDelay(3000)
                    );
                    window.history.back();
                });
            }, function() {

            });
        };

        $scope.save = function() {
            $scope.entry.$update(function() {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Task saved")
                        .position("bottom right")
                        .hideDelay(3000)
                );
                window.history.back();
            });
        };
}).
component('taskDetail', {
    templateUrl: '/templates/task/detail.template.html'
});