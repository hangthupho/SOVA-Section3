define(['knockout', 'jquery', 'jqcloud2', 'dataservice', 'postbox', 'config'], function (ko, jquery, jqcloud2, dataService, postbox, config) {
    return function () {
        var words = ko.observableArray([]);
        var searchfor = ko.observable("");
        //Search on enter
        $('#system-search').keyup(function (event) {
            if (event.keyCode === 13) {
                search();
            }
        });

        var search = function () {
            var searchfor = jQuery('#system-search').val();
            dataService.getWordCloud(searchfor, function (data) {              
                $('#wordcloud').jQCloud( data,
                {
                    fontSize: {
                        from: 0.15,
                        to: 0.02
                    }
                });

                $('#wordcloud').jQCloud('update', data);

                if (data === null || data.length === 0) {
                    toastr.warning('No posts found!');
                }
            });
        }

        return {
            words,
            search,
            searchfor
        };
    };
});