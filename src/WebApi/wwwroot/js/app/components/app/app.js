define(['knockout', 'postman', 'config'], function (ko, postman, config) {
    return function () {
        var menuItems = [
            { title: config.menuItems.histories, component: 'post-list' },
            { title: config.menuItems.search, component: 'search-list' },
            { title: config.menuItems.details, component: 'search-detail' },
            { title: config.menuItems.comment, component: 'annotation-list' }

        ];
        var currentParams = ko.observable();
        var currentComponent = ko.observable();
        var selectedMenu = ko.observable();

        var selectMenu = function (menu, params) {
            selectedMenu(menu);
            currentParams(params);
            currentComponent(menu.component);
        }

        var isSelected = function (menu) {
            return menu === selectedMenu();
        }
        postman.subscribe(config.events.selectSearch, function (params) {
            currentParams(params);
            currentComponent("search-detail");
        });

        postman.subscribe(config.events.changeMenu, function (data) {
            for (var i = 0; i < menuItems.length; i++) {
                if (menuItems[i].title === data.title) {
                    selectMenu(menuItems[i], data.params);
                    break;
                }
            }
        });

        selectMenu(menuItems[0]);

        return {
            menuItems,
            currentComponent,
            currentParams,
            selectMenu,
            isSelected
        }
    }
});