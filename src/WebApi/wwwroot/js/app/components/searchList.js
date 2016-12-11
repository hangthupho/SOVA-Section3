define(['knockout', 'dataservice', 'jquery', 'postman', 'config'],
    function (ko, dataservice,$,postman, config) {
        return function (params) {
            var self = this;
            var sList = ko.observableArray([]);
            var search = ko.observable("");
            var postDetail = ko.observableArray([]);
            var callback = function (data) {
                postDetail(data);
               
                postman.publish(config.events.selectSearch, { data });
                console.log(data);

            };
            var setData = function (result) {
                sList(result.list);
               
                //historyDetail(result.hist);
              

            };
            var getDetails = function (xx) {
                var sId = xx.id;
                dataservice.getPostId(sId, callback);
                
            }
            var clickSearch = function () {
                dataservice.getSearch(search(), function(result) {
                    console.log(result);
                    setData(result);

                });
            };
            return {
                search, sList, clickSearch, getDetails, postDetail
            };
        };
    });