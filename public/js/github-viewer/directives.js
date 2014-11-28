(function() {
    
    angular.module('githubViewer')
    
        .directive('gitRequestsRemain', function() {
            return {
                restrict: 'A',
                templateUrl: '/directives/git-requests-remain.html'
            };
        })
    
        .directive('gitUserDetails', function() {
            return {
                restrict: 'A',
                templateUrl: '/directives/git-user-details.html'
            };
        })
        
        .directive('gitUserRepos', function() {
            return {
                restrict: 'A',
                templateUrl: '/directives/git-user-repos.html'
            };
        });
    
}());