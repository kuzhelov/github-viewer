(function() {

    var github_api = angular.module("github_api", []);

    github_api.controller("user", function($scope, $http) {

        $scope.search_user = function(username) {

            $scope.user = undefined;

            $http.get('https://api.github.com/users/' + username)
                .then(
                    function(response) {
                        var userData = response.data;

                        $scope.user = {
                            name: userData.name || "unknown",
                            location: userData.location || "unknown",
                            image_url: userData.avatar_url
                        };

                        $scope.requests_remain = response.headers('X-RateLimit-Remaining');

                        return $http.get(userData.repos_url);
                    })
                .then(
                    function(response) {
                        var repositoriesData = response.data;
                        $scope.user.repositories = $.map(repositoriesData,
                            function(repositoryData) {
                                return {
                                    name: repositoryData.name,
                                    description: repositoryData.description,
                                    stars: repositoryData.stargazers_count,
                                    language: repositoryData.language
                                }
                            });
                    },
                    function(error) {
                        console.log(error);
                    });
        };

        $scope.repository_sort_order = "+name";

        // $http.get('https://api.github.com/users/gonzaloruizdevilla')
        // 	.then(
        // 		function(response) {
        // 			$scope.user = response.data;
        // 			$scope.requests_remain = response.headers("X-RateLimit-Remaining");
        // 		}, 
        // 		function(error) {
        // 			$scope.error = error;
        // 		});

    });
}());