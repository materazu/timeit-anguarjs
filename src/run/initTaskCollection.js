'use strict';

app
	/**
	 * Init the collection of task
	 **/
	.run(function ($rootScope, taskProvider) {
        $rootScope.$on('user:isConnected', function () {
            var taskCollectionFromLocalStorage = getFromLocalStorage('taskCollection', true, false);

            if (taskCollectionFromLocalStorage) {
                $rootScope.taskCollection = taskCollectionFromLocalStorage;
            } else {
                taskProvider
                    .getCollection()
                    .then(saveToLocalStorageAndRootScope)
                ;
            }

            function saveToLocalStorageAndRootScope (data) {
                $rootScope.taskCollection = data;
                saveToLocalStorage('taskCollection', data, true);
            }
        });


        $rootScope.$watchCollection('taskCollection', saveCollection);

        function saveCollection () {
            if ($rootScope.taskCollection) {
                saveToLocalStorage('taskCollection', $rootScope.taskCollection, true);
            }
        }
	})
;