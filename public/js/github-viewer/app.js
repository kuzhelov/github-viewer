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
                .otherwise( {redirectTo: '/'} );
        });
    
}());