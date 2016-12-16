define(['knockout', 'dataservice', 'postbox', 'config', 'toastr', '../app/pagination'], function (ko, dataService, postbox, config, toastr, pagination) {
    return function (params) {

        var posts = ko.observableArray([]);
        var searchfor = ko.observable(params ? params.str : undefined);

        var checkedStatus = ko.observable(false);
        var postDetail = ko.observableArray([]);
        var isFirstPage = ko.observable(true);
        var isLastPage = ko.observable(true);
        var isCurrentPage = ko.observable(1);
        var allPages = ko.observableArray([]);
        var items = ko.observableArray([]);
        var selectedSearch = ko.observable();

        var searchMethod = ko.observableArray(["Relevance", "Best Match"]);

        var totalItemCount = ko.observable(1);

        var update = function () {

            return selectedSearch;
        }
        var currentSelected = ko.observable(1);

        //Search on enter
        $('#system-search').keyup(function (event) {
            if (event.keyCode === 13) {
                search();
            }
        });

        var selectItem = function (value) {
            currentSelected(value);

            console.log("selectItem called");
            console.log(currentSelected(value));
        };

        var moveToPage = function (value) {
            pagination.moveToPage(value);
            if (value > pagination.pageCount())
                pagination.moveToPage(1);
            isCurrentPage(value);
            console.log(isCurrentPage());
            var page = pagination.pagedItems();
            posts(page);
            //selectItem(value);
        };

        var nextPage = function () {
            pagination.nextPage();
            var page = pagination.pagedItems();
            posts(page);
        };

        var previousPage = function () {
            pagination.previousPage();
            var page = pagination.pagedItems();
            posts(page);
        };

        console.log(JSON.stringify(ko.toJS((selectedSearch))));
        //Search posts
        var search = function () {
            console.log('Search function called');
            update();

            var searchfor = jQuery('#system-search').val();
            if (selectedSearch() === "Relevance") {
                console.log('ok');
                dataService.getSearchedResults(searchfor,
                    function (data) {
                        items(data);
                        console.log(isFirstPage);
                        pagination.PagerModel(items);

                        isFirstPage(new ko.observable(pagination.isFirstPage()));
                        isLastPage(new ko.observable(pagination.isLastPage()));

                        allPages([]);
                        pagination.moveToPage(1);
                        allPages(new ko.observableArray(pagination.allPages()));

                        console.log(allPages);
                        var page = pagination.pagedItems();

                        totalItemCount(new ko.observable(pagination.totalItemCount()));
                        var list = page.map(function (p) {

                            var postObject = Object.assign(p, { status: ko.observable(p.status) });
                            postObject.status.subscribe(function () {
                                dataService.updateStatus(postObject.id, postObject.status(), function (data) {

                                });
                            });
                            return postObject;
                        });

                        posts(list);

                        if (data === null || data.length === 0) {
                            toastr.warning('No posts found!');
                        }
                    });
            }
            else if (selectedSearch() === "Best Match") {

                dataService.getSearchedBmResults(searchfor,
                    function (data) {
                        items(data);
                        console.log(isFirstPage);
                        pagination.PagerModel(items);

                        isFirstPage(new ko.observable(pagination.isFirstPage()));
                        isLastPage(new ko.observable(pagination.isLastPage()));

                        allPages([]);
                        pagination.moveToPage(1);
                        allPages(new ko.observableArray(pagination.allPages()));

                        console.log(allPages);
                        var page = pagination.pagedItems();

                        totalItemCount(new ko.observable(pagination.totalItemCount()));

                        posts(page);
                        console.log("posts(page): " + posts(page));
                        if (data === null || data.length === 0) {
                            toastr.warning('No posts found!');
                        }
                    });
            } else {
                toastr.warning('PLease choose search method!');
            }
        };


        var callback = function (data) {
            postDetail(data);
            console.log(data);

        };
        var getDetails = function (xx) {
            dataService.getPostId(xx.id, callback);

        }

        return {
            posts,
            search,
            searchfor,
            checkedStatus,
            items,
            pagination,
            isCurrentPage,
            isFirstPage,
            isLastPage,
            allPages,
            moveToPage,
            totalItemCount,
            nextPage,
            previousPage,
            currentSelected,
            selectItem,
            getDetails,
            postDetail,
            selectedSearch,
            searchMethod

        };
    };
});
