'use strict';

app
    .controller('projectController', function (projectRepository) {
        this.remove = projectRepository.remove;
        this.removeAll = projectRepository.removeAll;
        this.save = projectRepository.save;
    })
;