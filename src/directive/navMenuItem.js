'use strict';

app
    .directive('navMenuItem', function () {
        return {
            restrict: 'E',
            link: function(scope) {
                scope.$watch('user', function () {
                    var template;
                    var user = scope.user;

                    switch (true) {
                        case angular.isObject(user) && user.isAdmin():
                            template = 'admin';
                            break;
                        case angular.isObject(user):
                            template = 'user';
                            break;
                        default:
                            template = 'anonymous';
                    }

                    scope.templateUrl = 'src/view/nav-menu-item/' + template + '.html';
                }, true);
            },
            template: '<ul class="nav navbar-nav navbar-right navbar-collapse collapse" ng-include="templateUrl"></ul>'
        }
    })
;