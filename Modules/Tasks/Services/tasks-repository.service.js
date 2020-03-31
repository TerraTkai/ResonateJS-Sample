resonate
    .inModule('Tasks')
    .createService('TasksRepository')
    .asSingleton(function (service) {
        var tasks = [];
        var evaluateTimeout = 0;

        var evaluateStatus = function (task) {
            var statusChanged = false;

            if (task.statusId !== 3) {
                var isOverdue = task.due < new Date();

                if ((isOverdue && task.statusId === 1) || (!isOverdue && task.statusId === 2)) {
                    task.statusId = isOverdue ? 2 : 1;
                    statusChanged = true;
                }
            }

            return statusChanged;
        };

        var persist = function () {
            tasks.sort(function (taskA, taskB) {
                if (taskA.due < taskB.due) {
                    return -1;
                }
                else if (taskA.due > taskB.due) {
                    return 1;
                }

                return 0;
            });

            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        var evaluateStatuses = function () {
            clearTimeout(evaluateTimeout);

            var now = new Date();
            var next = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
            var hasChanges = false;

            tasks.forEach(function (task) {
                if (evaluateStatus(task)) {
                    hasChanges = true;
                }
            });

            if (hasChanges) {
                resonate.refresh();
            }

            setTimeout(evaluateStatuses, next, true);
        };

        service.getTasks = function () {
            return tasks;
        };

        service.deleteTask = function (task) {
            tasks.remove(task);
            persist();
        };

        service.addTask = function (task) {
            tasks.push(task);
            evaluateStatus(task);
            persist();
        };

        service.updateTask = function (task) {
            evaluateStatus(task);
            persist();
        };

        service.getTask = function (taskId) {
            var maxId = 0;

            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id === parseInt(taskId)) {
                    return tasks[i];
                }
                if (tasks[i].id > maxId) maxId = tasks[i].id;
            }

            return {
                id: maxId + 1,
                description: '',
                due: null,
                statusId: 1,
                created: new Date(),
                updated: new Date()
            };
        };

        var stored = localStorage.getItem('tasks');
        if (stored) {
            tasks = JSON.parse(stored);
            tasks.forEach(function (task) {
                task.due = new Date(Date.parse(task.due));
                task.created = new Date(Date.parse(task.created));
                task.updated = new Date(Date.parse(task.updated));
            });
        }

        evaluateStatuses();
    });