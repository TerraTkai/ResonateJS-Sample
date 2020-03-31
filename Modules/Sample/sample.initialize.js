resonate
    .createArea('Tasks')
    .forRoutes('/demo*')
    .withModules('Tasks');

resonate
    .inModule('Sample')
    .setLocalization()
    .forLocales('en-gb', 'fr-fr')
    .withDefault('en-gb')
    .from('/localization/sample.localization.{locale}.json');