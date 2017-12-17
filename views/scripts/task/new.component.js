angularApp.controller('taskNewController',
    function taskNewController($scope, $routeParams, $mdToast, Task) {
        $scope.options = ['pending', 'ongoing', 'completed'];
        $scope.entry = new Task();

        $scope.add = function() {
            $scope.entry.$save(function() {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Task added")
                        .position("bottom right")
                        .hideDelay(3000)
                );
                window.history.back();
            });
        };
}).
component('taskNew', {
    templateUrl: '/templates/task/new.template.html'
});