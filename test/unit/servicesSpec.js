'use strict';

var recordService, freshness, yo, emptyContact, emptyRecord;

describe('greetingService server calls', function () {

    beforeEach(module('metadataEditor'));

    var greetingService, $httpBackend, $rootScope;
    beforeEach(
        inject(function($injector) {
            greetingService = $injector.get('greetingService');

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

        greetingService.getGreeting('שלום');

        $httpBackend.flush();
    });
});