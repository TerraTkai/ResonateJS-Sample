resonate
    .inModule('Tasks')
    .createView('task-details')
    .with('TasksRepository', 'Routing')
    .at('/demo/tasks/details', '/demo/tasks/details/{task-id}')
    .as(function (view, tasksRepository, routing) {
        var task = tasksRepository.getTask(view.routeData.taskId);

        view.task = {
            id: task.id,
            statusId: task.statusId,
            description: task.description,
            created: task.created,
            updated: task.updated,
            dueDate: '',
            dueTime: '',
            isNewTask: !task.due
        };

        if (task.due) {
            view.task.dueDate = task.due
                .toLocaleDateString('en-GB')
                .split('/')
                .reverse()
                .join('-');

            view.task.dueTime = task.due.toLocaleTimeString('en-GB', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        view.dueChanged = false;
        view.descriptionChanged = false;

        view.save = function () {
            task.description = view.task.description;
            task.due = new Date(Date.parse(view.task.dueDate + ' ' + view.task.dueTime));
            task.statusId = view.task.statusId;

            if (view.task.isNewTask) {
                tasksRepository.addTask(task);
            }
            else {
                task.updated = new Date();
                tasksRepository.updateTask(task);
            }

            routing.changeRoute('/demo/tasks');
        };

        view.complete = function () {
            view.task.statusId = 3;
            view.save();
        };

        view.cancel = function () {
            routing.changeRoute('/demo/tasks');
        };

        view.isValid = function () {
            return view.task.description !== '' && view.task.dueDate !== '' && view.task.dueTime !== '';
        };
    });