'use strict';

app
    .service('taskRepository', function ($rootScope, baseRepository, $timeout, taskProvider, $log) {
        var element = null;

        /**
         * Init vars and dependencies
         */
        function init () {
            element = document.querySelector('#taskProject');

            baseRepository
                .setCollection($rootScope.taskCollection)
                .setElement(element)
            ;
        };

        /**
         *
         */
        function saveTask () {
            var task = {'title': this.task.title, 'project': this.task.project, 'user': $rootScope.user.username};
            this.task = {};

            function addItemToRepository (task) {
                baseRepository
                    .setItem(task)
                    .save()
                ;

                return task;
            }

            function logTask (task) {
                $log.info(task);
            }

            taskProvider
                .setData(task)
                .addItem()
                .then(addItemToRepository)
                .then(logTask)
            ;
        };

        /**
         *
         * @param id
         */
        function finishTask (id) {
            console.log(id);
            var task = $rootScope.taskCollection[id];
            task.finish = !task.finish;

            $rootScope.taskCollection[id] = angular.copy(task);
        };

        /**
         *
         * @param id
         */
        function removeTask (id) {
            baseRepository.remove(id);;
        };

        /**
         *
         */
        function removeAll () {
            $rootScope.collectionTemp = angular.copy($rootScope.taskCollection);
            $rootScope.taskCollection = baseRepository.removeAll();

            $rootScope.displayRemoveAllAlert = $timeout(function () {
                $rootScope.displayRemoveAllAlert = false;
            }, 3000);
        };

        /**
         * Expose
         */
        this.saveTask = saveTask;
        this.finishTask = finishTask;
        this.removeTask = removeTask;
        this.removeAll = removeAll;
        this.init = init;
    })
;