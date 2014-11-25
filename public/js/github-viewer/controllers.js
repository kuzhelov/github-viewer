(function() {

    var githubViewer = angular.module("githubViewer");

    githubViewer.controller("user", function($scope, $http, githubService) {

        $scope.search_user = function(username) {

            $scope.user = undefined;
            
            githubService.getUser(username)
            .then(function(user) {
                $scope.user = user;
                $scope.requests_remain = user.requests_remain;
                
                return githubService.getRepositoriesOf(user);
            })
            .then(function(repositories) {
                $scope.user.repositories = repositories;
                $scope.requests_remain = repositories.requests_remain;
            })
            .catch(function(error) {
                console.log(error);
            });
        };

        $scope.repository_sort_order = "+name";
    });
}());