'use strict';

app
    .run(function ($rootScope, userService) {
        $rootScope.logout = userService.logout;
    })
;