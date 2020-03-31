resonate
    .inModule('Tasks')
    .createExpression('formatDateTime')
    .with('Localization')
    .as(function (localization) {
        return function (dateTime) {
            if (!dateTime) dateTime = new Date();
            var locale = localization.getLocale();

            return dateTime.toLocaleDateString(locale) + ' ' +
                   dateTime.toLocaleTimeString([locale], {
                       hour12: false,
                       hour: '2-digit',
                       minute: '2-digit'
                   });
        };
    });