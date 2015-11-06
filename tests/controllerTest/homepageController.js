'use strict';

describe('Controllers', function() {
    beforeEach(module('timeit'));
    var $scope;

    describe('Homepage controller', function() {
        var homeCtrl;

        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            homeCtrl = $controller('homepageController', { $scope: $scope });
        }))

        it('should be defined', function() {
            expect(homeCtrl).toBeDefined();
        });

        it('should fetch the posts', function() {
            expect(homeCtrl.plop).toBe('plop');
        });
    });
});