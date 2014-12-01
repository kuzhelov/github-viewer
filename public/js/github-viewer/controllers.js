(function() {

    angular.module("githubViewer")
        
        .controller("MainController", function($scope, $location) {
            
            $scope.showUser = function(username) {
                $location.path('/user/' + username);
            };
        })
        
        .controller("UserController", function($scope, $http, $routeParams, $location, githubService) {
    
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
        
        .controller('UserReposController', function($scope, $location) {
            
            this.init = function() {
                $scope.repositorySortOrder = "+name";
            };
            
            this.showContributorsOf = function(repository) {
                var contributorsPath = $location.path() + '/' + repository.name + '/contributors';
                $location.path(contributorsPath);
            };
            
            this.showStargazersOf = function(repository) {
                var stargazersPath = $location.path() + '/' + repository.name + '/stargazers';
                $location.path(stargazersPath);
            };
            
            this.init();
        })
        
        .controller('RepoContributorsController', function($scope, $routeParams, githubService) {
            
            this.init = function() {
                
                $scope.userName = $routeParams.username;
                $scope.repoName = $routeParams.reponame;
                
                githubService.getRepository( $scope.userName, $scope.repoName)
                    .then(function(repository) {
                        return githubService.getContributorsOf(repository);
                    })
                    .then(function(contributors) {
                        $scope.contributors = contributors;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            };
            
            this.init();
        })
        
        .controller('RepoStargazersController', function($scope, $routeParams, githubService) {
            
            this.init = function() {
                
                $scope.userName = $routeParams.username;
                $scope.repoName = $routeParams.reponame;
                
                githubService.getRepository($scope.userName, $scope.repoName)
                    .then(function(repository) {
                        return githubService.getStargazersOf(repository);
                    })
                    .then(function(stargazers) {
                        $scope.stargazers = stargazers;
                    })
                    .catch(function(error) {
                        console.log(error); 
                    });
            };
            
            this.init();
        });
}());