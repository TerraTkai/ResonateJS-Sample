resonate
    .inModule('Tasks')
    .createAttribute('localize-help')
    .with('Content')
    .as(function (attribute, content) {
        var element = attribute.element;
        attribute.on('render', function () {
            element.style.position = 'relative';
            content.insert(element, '<div class="help"><div localize="{localizeHelp}"></div></div>', element.childNodes.length);
        });
    });