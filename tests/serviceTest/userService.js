'use strict';

describe('Services', function() {
    beforeEach(module('timeit'));

    describe('When user service create an User', function() {
        var userService;
        var $rootScope;
        var httpBackend;

        beforeEach(inject(function(_$rootScope_, _userService_, $httpBackend) {
            $rootScope = _$rootScope_;
            userService = _userService_;
            httpBackend = $httpBackend;
        }));

        it('should attach an error when passwords not equals', function() {
            var user = {'username': 'toto', 'password': '1234', passwordRepeat: '345'};
            userService.signUp(user);
            var error = $rootScope.signUpFormError;

            expect(error).toBe('Les mots de passe doivent correspondre ;)');
        });

        it('should remove error when passwords are ok the second time', function() {
            var user = {'username': 'toto', 'password': '1234', passwordRepeat: '345'};
            userService.signUp(user);
            var error = $rootScope.signUpFormError;

            expect(error).toBe('Les mots de passe doivent correspondre ;)');

            var user = {'username': 'toto', 'password': '1234', passwordRepeat: '1234'};
            userService.signUp(user);
            var error = $rootScope.signUpFormError;

            expect(error).toBe(false);
        });

        it('should remove user from rootScope at logout', function() {
            $rootScope.user = {'username': 'toto', 'password': '1234', passwordRepeat: '345'};
            expect($rootScope.user).not.toBe(null);

            userService.logout();
            expect($rootScope.user).toBe(undefined);
        });
    });
});