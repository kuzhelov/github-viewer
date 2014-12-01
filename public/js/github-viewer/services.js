(function() {
    
    angular.module("githubViewer")
    
        .service("githubService", function($http) {
        
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
                                stargazers_url: userData.stargazers_url,
                                contributors_url: userData.contributors_url,
                                requests_remain: getRequestsRemain(response)
                            };
                        });
            };
            
            // repository: { name, description, stars, language, contributors_url, stargazers_url }
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
                                        language: repositoryData.language,
                                        contributors_url: repositoryData.contributors_url,
                                        stargazers_url: repositoryData.stargazers_url
                                    };
                                });
                                
                            repositories.requests_remain = getRequestsRemain(response);
                            return repositories;
                        });
            };
            
            this.getRepository = function(username, repoName) {
                
                var githubService = this;
                
                return githubService.getUser(username)
                    .then(function(user) {
                        return githubService.getRepositoriesOf(user);
                    })
                    .then(function(repositories) {
                        
                        var requestedRepository = $.grep(repositories, function(each) {
                                return each.name === repoName;
                            })[0];
                            
                        requestedRepository.requests_remain = repositories.requests_remain;
                        return requestedRepository;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });  
            };
            
            // stargazer: { name, image_url }
            this.getStargazersOf = function(repository) {
                return $http.get(repository.stargazers_url)
                    .then(function(response) {
                        
                        var stargazersData = response.data;
                        
                        var stargazers = $.map(stargazersData, function(singleStargazerData) {
                            return {
                                name: singleStargazerData.login,
                                image_url: singleStargazerData.avatar_url
                            };
                        });
                        
                        stargazers.requests_remain = getRequestsRemain(response);
                        
                        return stargazers;
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
            };
            
            // contributor: { name, image_url }
            this.getContributorsOf = function(repository) {
                
                return $http.get(repository.contributors_url)
                    .then(function(response) {
                        var contributorsData = response.data;
                        
                        var contributors = $.map(contributorsData, function(each) {
                            return {
                                name: each.login,
                                image_url: each.avatar_url
                            };
                        });
                        
                        contributors.requests_remain = getRequestsRemain(response);
                        return contributors;
                    })
                    .catch(function(error) {
                       console.log(error); 
                    });
            };
            
            function getRequestsRemain(response) {
                return response.headers('X-RateLimit-Remaining');
            }
    });
    
}());