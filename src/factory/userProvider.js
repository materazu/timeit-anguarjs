'use strict';

app
    .factory('userProvider', function ($http, appConfig, $q) {
        var
            url = appConfig.apiUrl + appConfig.apiUserCollection
            ;

        function setData(data) {
            this.data = data;

            return this;
        }

        function addItem () {
            var deferred = $q.defer();
            var data = this.data;

            $http({
                method: 'POST',
                url: url,
                params: appConfig.apiDefaultParams,
                data: data
            }).success(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }

        function getCollection () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: url,
                params: appConfig.apiDefaultParams
            }).success(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }

        function getOne (username) {
            var deferred = $q.defer();
            var request = {q: {username: username}, fo: true};

            $http({
                method: 'GET',
                url: url,
                params: angular.extend({}, appConfig.apiDefaultParams, request)
            }).success(function (user) {
                if (user) {
                    deferred.resolve(user);
                }

                deferred.reject();
            });

            return deferred.promise;
        }

        return {
            'getOne': getOne,
            'setData': setData,
            'addItem': addItem,
            'getCollection': getCollection
        };
    })
;