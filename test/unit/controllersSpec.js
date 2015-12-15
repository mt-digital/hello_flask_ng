'use strict';

var testScope = {};

describe('handleGreetingRequest', function() {

    beforeEach(module('greetingsApp'));

    var GreetingService, emptyContact, testCtrl;
    beforeEach(
        inject(function($injector, $controller) {
            GreetingService = $injector.get('GreetingService');
            testCtrl = $controller('GreetingController', {$scope: testScope});
        })
    );

    it('should return the greeting in the expected format and key/vals',
        function () {
            // create a fake return value fo
            spyOn(GreetingService, 'getGreeting')
                .andReturn({
                    success: function(callback) {

                        callback({
                            language: 'Spanish',
                            greeting: 'Hola, matty'
                        });

                        // success returns an object with error fn as the field
                        return {
                            error: function(callback) {
                                callback('Error!');
                            }
                        };
                    }
                });

            testScope.stuff.name = 'matty';
            testScope.handleGreetingRequest();

            expect(GreetingService.getGreeting).toHaveBeenCalledWith('matty');

            expect(testScope.stuff.language).toEqual('Spanish');
            expect(testScope.stuff.greeting).toEqual('Hola, matty');
        }
    );
});