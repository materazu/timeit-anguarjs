'use strict';

app
    /**
     * Stop remove event
     */
    .run(function ($rootScope, $timeout, baseRepository) {
        function stopRemoveAll (type) {
            $timeout.cancel($rootScope.displayRemoveAllAlert);
            var tempCollection = $rootScope.collectionTemp;

            switch (type) {
                case 'task':
                    $rootScope.taskCollection = tempCollection;
                    break;
                case 'project':
                    $rootScope.projectCollection = tempCollection;
                    break;
            }

            baseRepository.setCollection(tempCollection);
            $rootScope.displayRemoveAllAlert = false;
        };

        $rootScope.stopRemoveAll = stopRemoveAll;
    })
;