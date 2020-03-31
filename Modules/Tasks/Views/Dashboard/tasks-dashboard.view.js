resonate
    .inModule('Tasks')
    .createView('tasks-dashboard')
    .at('/demo/tasks')
    .with('TasksRepository')
    .as(function (view, tasksRepository) {

        view.statistics = { complete: 0, overdue: 0, pending: 0 };
        view.nextTask = null;
        view.tasks = tasksRepository.getTasks();

        view.deleteTask = function (task, event) {
            event.preventDefault();
            event.stopPropagation();
            tasksRepository.deleteTask(task);
        };

        view.on('evaluate', function () {
            view.statistics.complete = 0;
            view.statistics.overdue = 0;
            view.statistics.pending = 0;

            view.nextTask = null;

            view.tasks.forEach(function (task) {
                if (!view.nextTask && task.statusId !== 3) {
                    view.nextTask = task;
                }

                switch (task.statusId) {
                    case 1:
                        view.statistics.pending++;
                        break;
                    case 2:
                        view.statistics.overdue++;
                        break;
                    case 3:
                        view.statistics.complete++;
                        break;
                }
            });
        });
    });