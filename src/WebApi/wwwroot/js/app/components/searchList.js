define(['knockout', 'dataservice', 'jquery'],
    function (ko, dataservice,$) {
        return function () {
            var self = this;
            var sList = ko.observableArray([]);
            var search = ko.observable("");
            var postDetail = ko.observableArray([]);
            var callback = function (data) {
                postDetail(data);
                console.log(data);

            };
            var getDetails = function (xx) {
                dataservice.getPostId(xx.id, callback);

            }
            var clickSearch = function () {
                dataservice.getSearch(search(), function(data) {
                    console.log(data);

                    for (var i in data.list) {
                        var row = data.list[i];
                        sList.push(row);
                    }
                });
            };
            return {
                search, sList, clickSearch, getDetails, postDetail
            };
        };
    });