resonate
    .inModule('Tasks')
    .createExpression('getStatus')
    .with('Localization')
    .as(function (localization) {
        var statuses = null;

        var getStatuses = function () {
            statuses.forEach(function (status) {
                status.name = localization.localize(status.key);
            });
        };

        return function (statusId) {
            if (!statuses) {
                statuses = [{ key: 'status-pending' }, { key: 'status-overdue' }, { key: 'status-complete' }];
                getStatuses();
                localization.onLocaleChange(getStatuses);
            }
            return statuses[statusId - 1].name;
        };
    });