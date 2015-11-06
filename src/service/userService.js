'use strict';

app
    .service('userService', function ($rootScope, appConfig, $location, routeConfig, userProvider, $q) {
        /**
         *
         * @returns {signUpFormError|*}
         */
        function signUp (user) {
            if (user.password !== user.passwordRepeat) {
                return $rootScope.signUpFormError = appConfig.signUpFormError;
            }

            delete(user.passwordRepeat);
            user.salt = getSalt(user);
            user.password = hashPassword(user.password, user.salt);

            userProvider
                .setData(user)
                .addItem()
                .then(saveToLocalStorageAndRootScope)
            ;

            function saveToLocalStorageAndRootScope (user) {
                delete(user.password);
                delete(user.salt);

                saveToLocalStorage('currentUser', user, true);
                $rootScope.user = new User(user);
            }

            //animation
            $rootScope.signUpFormError = false;
            $location.path(routeConfig.task.path);
        }

        /**
         *
         */
        function logout () {
            delete($rootScope.user);
            removeFromLocalStorage('currentUser');
            removeFromLocalStorage('taskCollection');

            $location.path('/');
        }

        /**
         *
         * @param password
         * @param salt
         * @returns {*}
         */
        function hashPassword (password, salt) {
            var hashPassword = CryptoJS.MD5(password);

            return CryptoJS.SHA1(hashPassword + salt).toString();
        }

        /**
         *
         * @param user
         * @returns {*}
         */
        function getSalt (user) {
            var appSalt = CryptoJS.MD5(chance.guid());
            var userSalt = CryptoJS.MD5(user.username);

            return CryptoJS.SHA1(appSalt + userSalt).toString();
        }

        /**
         *
         */
        function login () {
            var user = this.user;

            verifyPassword(user)
                .then(logUser, rejectUser)
            ;

            function logUser (user) {
                var user = new User(user);

                $rootScope.user = user;
                $rootScope.loginFormError = false;

                saveToLocalStorage('currentUser', user, true);
                $rootScope.$broadcast('user:isConnected');

                return $location.path(routeConfig.task.path);
            }

            function rejectUser () {
                return $rootScope.loginFormError = appConfig.loginFormError;
            }
        }

        /**
         *
         * @param username
         * @param password
         * @returns {boolean}
         */
        function verifyPassword (user) {
            var deffered = $q.defer();

            userProvider
                .getOne(user.username)
                .then(checkPassword, returnFalse);

            function checkPassword (userStocked) {
                var passwordToTest = hashPassword(user.password, userStocked.salt);

                if (userStocked.password == passwordToTest) {
                    deffered.resolve(userStocked);
                }

                deffered.reject();
            }

            function returnFalse () {
                deffered.reject();
            }

            return deffered.promise;
        }

        /**
         * Create a user
         *
         * @param user
         * @constructor
         */
        function User (user) {
            this.username = user.username;
            this.role = this.username == 'lizjulien' ? 'admin' : 'user';
            this.isAdmin = function () {
                if (this.role == 'admin') {
                    return true;
                }

                return false;
            }
        }

        /**
         *
         */
        function makeUserReborn () {
            var currentUser = getFromLocalStorage('currentUser', true, null);

            if (currentUser) {
                $rootScope.$broadcast('user:isConnected');
                $rootScope.user = new User(currentUser);
            }
        }

        this.signUp = signUp;
        this.logout = logout;
        this.login = login;
        this.makeUserReborn = makeUserReborn;
    })
;