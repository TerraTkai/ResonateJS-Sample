resonate
    .inModule('Tasks')
    .setLocalization()
    .forLocales('en-gb', 'fr-fr')
    .withDefault('en-gb')
    .from('/localization/tasks.localization.{locale}.json');