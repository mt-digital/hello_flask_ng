'use strict';

var greetingsApp = angular
.module('greetingsApp', [])
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('userFile', file);
        return $http.post(uploadUrl, fd, {
            // transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    };
}])
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
.controller('GreetingController', ['$scope', '$log', 'GreetingService', 'fileUpload', 'hostname',
    function($scope, $log, GreetingService, fileUpload, hostname) {

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

        var uploadUrl = '//' + hostname + '/api/upload';

        if (typeof $scope.greetingsFile !== 'undefined')
        {
            fileUpload.uploadFileToUrl(
                $scope.greetingsFile, uploadUrl
            )
            .success( function () {

                GreetingService.getGreeting($scope.stuff.name)
                    .success( function(whatever)
                        {
                            $scope.stuff.greeting = whatever.greeting;
                            $scope.stuff.language = whatever.language;
                            $scope.stuff.fileName = $scope.greetingsFile.name;
                        }
                    )
                    .error(err => $log.log(err));
                });
        }
        else {
            GreetingService.getGreeting($scope.stuff.name)
                    .success( function(whatever)
                        {
                            $scope.stuff.greeting = whatever.greeting;
                            $scope.stuff.language = whatever.language;

                        }
                    )
                    .error(err => $log.log(err));
        }
    };
}]);
