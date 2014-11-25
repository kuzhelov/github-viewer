(function() {
    
    var githubViewer = angular.module("githubViewer");
    
    githubViewer.service("githubService", function($http) {
        
        this.getUser = function(username) {
            
            return $http.get('https://api.github.com/users/' + username)
                .then(
                    function(response) {
                        var userData = response.data;
                        return {
                            name: userData.name || "unknown",
                            location: userData.location || "unknown",
                            image_url: userData.avatar_url,
                            repositories_url: userData.repos_url,
                            requests_remain: response.headers('X-RateLimit-Remaining')
                        };
                    });
        };
        
        this.getRepositoriesOf = function(user) {
          
            return $http.get(user.repositories_url)
                .then(
                    function(response) {
                        
                        var repositoriesData = response.data;
                        var repositories = $.map(repositoriesData,
                            function(repositoryData) {
                                return {
                                    name: repositoryData.name,
                                    description: repositoryData.description,
                                    stars: repositoryData.stargazers_count,
                                    language: repositoryData.language
                                };
                            });
                            
                        repositories.requests_remain = response.headers('X-RateLimit-Remaining');
                        return repositories;
                    });
        };
        
    });
    
}());