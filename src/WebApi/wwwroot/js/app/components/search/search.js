define(['knockout', 'dataservice', 'postbox', 'config', 'toastr','../app/pagination'], function (ko, dataService, postbox, config, toastr, pagination) {
    return function () {
        var posts = ko.observableArray([]);
        var searchfor = ko.observable("");
        var markedPost = ko.observableArray();
        var data;
        var isFirstPage = ko.observable(true);
        var isLastPage = ko.observable(true);
        var isCurrentPage = ko.observable(1);
        var allPages  = ko.observableArray([]);
        var items = ko.observableArray([]);
        var gtmp;
        var totalItemCount = ko.observable(1);

        var selectedSearch = ko.observable();
        var searchMethod = ko.observableArray(["Relevance", "Best Match"]);

        //Search on enter
        $('#system-search').keyup(function (event) {
            if (event.keyCode === 13) {
                search();
            }
        });
       
        //Update selected search option
        var update = function () {
            return selectedSearch;
        }

        //Mark post
        var checked = function (data) {
            return data.status === 1;
        }

        var markPost = function (id, index, data) {
            var tmp = data;
            dataService.updateStatus(id, tmp.status, function (data) {
                posts(data);
            });

            tmp.status = data.status === 0 ? 1 : 0;
            gtmp = tmp;
            gtmp.index = index;
            setTimeout(function () {
                //still doesn't work with the set timeout 
                $('#isChecked' + gtmp.index).prop('checked', gtmp.status === 0 ? false : true);
            }, 0);
            postbox.publish(config.events.markPost, id);
        };

        //Pagination
        var moveToPage = function (value) {
            pagination.moveToPage(value);
            if (value > pagination.pageCount())
                pagination.moveToPage(1);
            isCurrentPage(value);
            console.log(isCurrentPage());
            var page = pagination.pagedItems();
            posts(page);
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

        //Search posts
        var search = function () {
            update();                  
            var searchfor = jQuery('#system-search').val();
            if (selectedSearch() === "Relevance") {   
                dataService.getSearchedResults(searchfor, function (data) {
                    items(data);                           
                    pagination.PagerModel(items);
                  
                    isFirstPage( new ko.observable(pagination.isFirstPage()));
                    isLastPage(new ko.observable(pagination.isLastPage()));

                    allPages([]);
                    pagination.moveToPage(1);
                    allPages( new ko.observableArray(pagination.allPages()));

                    var page = pagination.pagedItems();

                    totalItemCount(new ko.observable(pagination.totalItemCount()));

                    posts(page);
                    if (data === null || data.length === 0) {
                        toastr.warning('No posts found!');
                    }
                });
            }
            else if (selectedSearch() === "Best Match") {
                dataService.getSearchedBmResults(searchfor,
                    function (data) {
                        items(data);
                        pagination.PagerModel(items);
                        isFirstPage(new ko.observable(pagination.isFirstPage()));
                        isLastPage(new ko.observable(pagination.isLastPage()));

                        allPages([]);
                        pagination.moveToPage(1);
                        allPages(new ko.observableArray(pagination.allPages()));

                        var page = pagination.pagedItems();
                        totalItemCount(new ko.observable(pagination.totalItemCount()));
                        posts(page);

                        if (data === null || data.length === 0) {
                            toastr.warning('No posts found!');
                        }
                    });
            } else {
                toastr.warning('PLease choose search method!');
            }
        };

        return {
            posts,
            search,
            markPost,
            searchfor,
            pagination,
            isCurrentPage,
            isFirstPage,
            isLastPage,
            allPages,
            moveToPage,
            totalItemCount,
            nextPage,
            previousPage,
            checked,
            searchMethod,
            selectedSearch

        };
    };
});
