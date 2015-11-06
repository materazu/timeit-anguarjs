'use strict';

app
    .config(function ($routeProvider, routeConfig, appConfig) {
        var
            controllerSuffix = appConfig.controllerSuffix,
            templateDirectory = 'src/view',
            templateSuffix = '.html'
        ;

        angular.forEach(routeConfig, function (route, controllerName) {
            var controller = controllerName + controllerSuffix;

            $routeProvider
                .when(route.path, {
                    templateUrl: templateDirectory + route.path + templateSuffix,
                    controller: controller,
                    controllerAs: controller
                })
            ;
        });

        $routeProvider
            .when('/', {
                templateUrl: 'src/view/homepage.html',
                controller: 'homepageController',
                controllerAs: 'homepageController'
            })
            .otherwise('/')
        ;
    })
;