'use strict';

app
    .factory('taskProvider', function ($http, appConfig, $q) {
        var
            url = appConfig.apiUrl + appConfig.apiTaskCollection
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

        return {
            'setData': setData,
            'addItem': addItem,
            'getCollection': getCollection
        };
    })
;