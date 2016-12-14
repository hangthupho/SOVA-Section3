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
        
        var totalItemCount = ko.observable(1);

        //Search on enter
        $('#system-search').keyup(function (event) {
            if (event.keyCode === 13) {
                search();
            }
        });
       
        var checked = function (data) {
            console.log(data.status);
            console.log(data.status === 1);
            return data.status === 1;
        }
        var markPost = function (id, index, data) {
            var tmp = data;
            tmp.status = tmp.status === 0 ? 1 : 0;
            //posts[index].status = 0;
            posts()[posts.indexOf(data)] = tmp;
  
           
            postbox.publish(config.events.markPost, id);
        };

        var isChecked = function (id) {
            return id === markedPost();
        }


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
        //var markPost = function () {
        //    if (status === 1) {
        //        console.log("current status is checked");
        //        checkedStatus = false;
        //    }
        //    else 
        //        checkedStatus = true;
        //    dataService.updateStatus(id, checkedStatus);

            //ko.utils.arrayForEach(this.posts(), function (post) {
            //    post.status = checkedStatus;

            //    console.log("checkedStatus: " + checkedStatus);
            //    console.log("post.status: " + post.status);
            //});
            //console.log(checkedStatus);
        //};

        //Search posts
        var search = function () {
            console.log('Search function called');            
            var searchfor = jQuery('#system-search').val();
            dataService.getSearchedResults(searchfor, function (data) {
                items(data);                           
                console.log(data);
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

        return {
            posts,
            search,
            markPost,
            //markedPost,
            //isChecked,
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
            checked

        };
    };
});
