'use strict';

app
    .controller('signUpController', function (userService) {
        this.signUp = userService.signUp;
    })

;