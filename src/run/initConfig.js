'use strict';

app
/**
 * Init app configurations
 **/
    .run(function ($rootScope, appConfig, routeConfig) {
        $rootScope.appConfig = appConfig;
        $rootScope.routeConfig = routeConfig;
    })
;