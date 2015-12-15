'use strict';

var greetingsApp = angular
.module('greetingsApp', [])
.factory('hostname', function () {
    var hostname = '';
    if (typeof(window.hostname) === 'undefined')
    {
        hostname = 'localhost:4000';
    }
    else
    {
        hostname = window.hostname;
    }

    return hostname;
})
.service('GreetingService', ['$http', 'hostname', function ($http, hostname) {
    /*
       Private functions that will not be exposed to the controller
     */

    /**
     * Send the name to the server to get the greeting back
     */
    var getGreeting = function(name) {
        return $http.get('//' + hostname + '/api/hello/' + name);
    };

    return {
        getGreeting: getGreeting
    };
}])
.controller('GreetingController', ['$scope', '$log', 'GreetingService',
    function($scope, $log, GreetingService) {

    /**
     * when greetingService is called, set corresponding variables
     */
    $scope.stuff = {
        name: '',
        greeting: '',
        language: ''
    };
    // $scope.name = '';
    // $scope.greeting = '';
    // $scope.language = '';


    $scope.handleGreetingRequest = function () {
        GreetingService.getGreeting($scope.stuff.name)
            .success( data =>
                {
                    console.log('got clicked...');
                    console.log(data);
                    $scope.stuff.greeting = data.greeting;
                    $scope.stuff.language = data.language;
                }
            )
            .error(err => $log.log(err));
    };
}]);
