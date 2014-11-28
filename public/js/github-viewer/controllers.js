(function() {

    angular.module("githubViewer")
        
        .controller("UserInputController", function($location) {
            
                this.showUser = function(username) {
                    $location.path('/user/' + username);
                };
                
            })

        .controller("UserController", function($scope, $http, $routeParams, githubService) {
    
            this.init = function() {
                
                var username = $routeParams.username;
                $scope.user = undefined;
            
                githubService.getUser(username)
                .then(function(user) {
                    $scope.user = user;
                    $scope.requestsRemain = user.requests_remain;
                    
                    return githubService.getRepositoriesOf(user);
                })
                .then(function(repositories) {
                    $scope.user.repositories = repositories;
                    $scope.requestsRemain = repositories.requests_remain;
                })
                .catch(function(error) {
                    console.log(error);
                });
            };
            
            this.init();
        })
        
        .controller('UserReposController', function($scope) {
            
            this.init = function() {
                $scope.repositorySortOrder = "+name";
            };
            
            this.init();
        });
}());