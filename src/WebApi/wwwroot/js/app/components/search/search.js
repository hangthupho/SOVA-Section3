define(['knockout', 'dataservice', 'postbox', 'config', 'toastr'], function (ko, dataService, postbox, config, toastr) {
    return function () {
        var posts = ko.observableArray([]);

        var search = function () {
            console.log('Search function called');
            var searchfor = jQuery('#system-search').val();

            dataService.getSearchedResults(searchfor, function (data) {
                posts(data);
                console.log(posts.length); 
                if (data === null || data.length === 0) {
                toastr.warning('No posts found!'); }
            });         
        };
        return {
            posts,
            search
        };
    };
});
