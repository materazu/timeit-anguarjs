'use strict';

app
    .controller('loginController', function (userService) {
        this.login = userService.login(this.user);
    })
;