resonate
    .inModule('Sample')
    .createComponent('Nav')
    .with('Localization')
    .as(function (component, localization) {
        component.showMenu = false;
        component.showLocales = false;
        component.currentLocale = localization.getLocale();

        component.changeLocale = function (locale) {
            if (component.currentLocal !== locale) {
                localization.changeLocale(locale);
                component.currentLocale = locale;
            }
            component.showLocales = false;
        };
    });