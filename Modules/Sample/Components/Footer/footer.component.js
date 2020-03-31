resonate
    .inModule('Sample')
    .createComponent('Footer')
    .as(function (component) {
        component.copyrightYear = (new Date()).getFullYear();

        var view = document.getElementsByTagName('view')[0];
        var adjustFooter = function () {
            view.style.minHeight = (window.innerHeight - 55) + 'px';
        };

        window.addEventListener('resize', adjustFooter);
        adjustFooter();
    });