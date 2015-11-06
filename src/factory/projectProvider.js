'use strict';

app
    .factory('projectProvider', function ($http, appConfig) {
        var
            url = appConfig.apiUrl + appConfig.apiProjectCollection
        ;

        function setData(data) {
            this.data = data;

            return this;
        }

        function setCallback (callback) {
            this.callback = callback;

            return this;
        }

        function addItem () {
            var data = this.data;
            var callback = this.callback;

            $http({
                method: 'POST',
                url: url,
                params: appConfig.apiDefaultParams,
                data: data
            }).then(callback);
        }

        function getCollection () {
            var callback = this.callback;

            $http({
                method: 'GET',
                url: url,
                params: appConfig.apiDefaultParams
            }).success(callback);
        }

        return {
            'getCollection': getCollection,
            'setCallback': setCallback,
            'setData': setData,
            'addItem': addItem
        };
    })
;