﻿define(['knockout', 'dataservice', 'postbox', 'config', 'toastr','../app/pagination'], function (ko, dataService, postbox, config, toastr, pagination) {
    return function (params) {
        
        var posts = ko.observableArray([]);
        var searchfor = ko.observable(params ? params.str : undefined);
        var markedPost = ko.observableArray();
        var checkedStatus = ko.observable(false);
        var postDetail = ko.observableArray([]);
        var isFirstPage = ko.observable(true);
        var isLastPage = ko.observable(true);
        var isCurrentPage = ko.observable(1);
        var allPages  = ko.observableArray([]);
        var items = ko.observableArray([]);
        var selectedSearch = ko.observable();
        var selectedSearch1 = ko.observable();
        var searchMethod = ko.observableArray(["Relevance", "Best Match"]);
       
        var searchMethod1 = ko.observableArray([{id: 1,name:"Relevance"}, {id: 2, name:"Best Match"} ]);
        var totalItemCount = ko.observable(1);
        //var moveToPage;
        //var nextPage;

        
        var update = function() {
            
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

        //Get PostID when mark it
        var markPost = function (id) {           
            //console.log("postId: " + id);
            //if(id.checkedStatus() === true) 
            //    console.log("dissociate item " + id.checkedStatus());
            //else console.log("associate item " + id.checkedStatus());
            //id.checkedStatus(!(id.checkedStatus()));
            //return true;
            console.log("postId: " + id);
        };

        self.toggleAssociation = function (item) {
            if (item.Selected() === true) console.log("dissociate item " + item.id());
            else console.log("associate item " + item.id());
            item.Selected(!(item.Selected()));
            return true;
        };
        //JSON.stringify(ko.toJS(
        console.log(JSON.stringify(ko.toJS((selectedSearch))));
        //Search posts
        var search = function () {
            console.log('Search function called');
            update();
            
            var searchfor = jQuery('#system-search').val();
            if (selectedSearch() === "Relevance") {
                console.log('ok');
                dataService.getSearchedResults(searchfor,
                    function(data) {
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
                            //var x = {
                            //    id: p.id,
                            //    ...
                            //    status: ko.observable(p.status),
                            //    ...
                            //    body: p.body
                            //};
                            var x = Object.assign(p, { status: ko.observable(p.status) });
                            x.status.subscribe(function () {
                                dataService.updateStatus(x.id, x.status(), function (data) {
                                    //posts(data);
                                });
                            });
                            return x;
                        });
                        posts(list);
                        console.log("posts(page): " + posts(page));
                        if (data === null || data.length === 0) {
                            toastr.warning('No posts found!');
                        }
                    });
            }
            else if (selectedSearch() === "Best Match") {
                console.log('ok');
                dataService.getSearchedBmResults(searchfor,
                    function(data) {
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
            markPost,
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
            searchMethod,
            selectedSearch1,
            searchMethod1
        };
    };
});
