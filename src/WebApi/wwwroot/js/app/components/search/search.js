define(['knockout', 'dataservice', 'postbox', 'config', 'toastr','../app/pagination'], function (ko, dataService, postbox, config, toastr, pagination) {
    return function () {
        var posts = ko.observableArray([]);
        var searchfor = ko.observable("");
        var checkedStatus = ko.observable(false);
        var postDetail = ko.observableArray([]);
        var isFirstPage = ko.observable(true);
        var isLastPage = ko.observable(true);
        var isCurrentPage = ko.observable(1);
        var allPages  = ko.observableArray([]);
        var items = ko.observableArray([]);
        
        var totalItemCount = ko.observable(1);
        //var moveToPage;
        //var nextPage;

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

        //Search posts
        var search = function () {
            console.log('Search function called');            
            var searchfor = jQuery('#system-search').val();
            dataService.getSearchedResults(searchfor, function (data) {
                items(data);                           
                console.log(isFirstPage);
                pagination.PagerModel(items);
                  
                isFirstPage( new ko.observable(pagination.isFirstPage()));
                isLastPage(new ko.observable(pagination.isLastPage()));

                allPages([]);
                pagination.moveToPage(1);
                allPages( new ko.observableArray(pagination.allPages()));

                console.log(allPages);
                var page = pagination.pagedItems();

                totalItemCount(new ko.observable(pagination.totalItemCount()));

                posts(page);
                console.log("posts(page): " + posts(page));
                if (data === null || data.length === 0) {
                    toastr.warning('No posts found!');
                }
            });
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
            postDetail
        };
    };
});
