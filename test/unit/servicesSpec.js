'use strict';

// var GreetingService, freshness, yo, emptyContact, emptyRecord;

describe('GreetingService server calls', function () {

    beforeEach(module('greetingsApp'));

    var GreetingService, $httpBackend, $rootScope;
    beforeEach(
        inject(function($injector) {
            GreetingService = $injector.get('GreetingService');

            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
        })
    );

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should replace missing dates with default dates',
    function()
    {
        $httpBackend.expectGET(/hello/).respond(200,
                    {
                language: 'Hebrew',
                greeting: 'שלום , מאט'
            }
        );

        $rootScope.$digest();

        GreetingService.getGreeting('שלום');

        $httpBackend.flush();
    });
});