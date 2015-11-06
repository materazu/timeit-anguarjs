'use strict';

app
/**
 * Init the collection of task
 **/
    .run(function ($rootScope, projectProvider, projectRepository) {
        $rootScope.$on('user:isConnected', function () {
            projectProvider
                .setCallback(setProjectsToRootScope)
                .getCollection()
            ;

            function setProjectsToRootScope(projects) {
                $rootScope.projectCollection = projects;
                projectRepository.init();
            }
        });
    })
;