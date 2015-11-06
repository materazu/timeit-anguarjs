'use strict';

app
    .service('projectRepository', function (baseRepository, $rootScope, $timeout, projectProvider) {
        var element = null;

        /**
         * Init vars and dependencies
         */
        function init () {
            element = document.querySelector('#projectTitle');

            baseRepository
                .setCollection($rootScope.projectCollection)
                .setElement(element)
            ;
        };

        /**
         *
         */
        function save () {
            var project = {'title': this.project.title};
            this.project = {};

            function callback (response) {
                baseRepository
                    .setItem(response.data)
                    .save();
            }

            projectProvider
                .setData(project)
                .setCallback(callback)
                .addItem()
            ;
        };

        /**
         *
         * @param id
         */
        function remove (id) {
            baseRepository.remove(id);
        };

        /**
         *
         */
        function removeAll () {
            $rootScope.collectionTemp = angular.copy($rootScope.projectCollection);
            $rootScope.projectCollection = baseRepository.removeAll();

            $rootScope.displayRemoveAllAlert = $timeout(function () {
                $rootScope.displayRemoveAllAlert = false;
            }, 3000);
        };

        /**
         * Expose
         */
        this.save = save;
        this.remove = remove;
        this.removeAll = removeAll;
        this.init = init;
    })
;