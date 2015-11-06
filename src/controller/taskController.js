'use strict';

app
	/**
	 * Control form
	 **/
	.controller('taskController', function (taskRepository) {
        taskRepository.init();

		this.finishTask = taskRepository.finishTask;
		this.removeTask = taskRepository.removeTask;
        this.removeAll = taskRepository.removeAll;
        this.saveTask = taskRepository.saveTask;
	})
;