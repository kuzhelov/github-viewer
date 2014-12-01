(function() {
    
    angular.module("githubViewer", ['ngRoute'])
    
        .config(function($routeProvider) {
           
            $routeProvider
                .when('/', {
                    templateUrl: '/partials/user-input.html'
                })
                .when('/user/:username', {
                    templateUrl: "/partials/user-details.html"
                })
                .when('/user/:username/:reponame/stargazers', {
                    templateUrl: "/partials/repo-stargazers.html"
                })
                .when('/user/:username/:reponame/contributors', {
                    templateUrl: "/partials/repo-contributors.html"
                })
                .otherwise( {redirectTo: '/'} );
        });
    
}());