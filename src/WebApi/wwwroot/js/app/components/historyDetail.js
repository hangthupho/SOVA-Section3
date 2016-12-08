define(['knockout', 'dataservice', 'postman', 'config'],
    function(ko, dataService, postman, config) {
        return function() {
        //var detailHist1 = ko.observableArray([""]);
        //    return function(params) {
        //    var url = params.url;
            var details = ko.observableArray("");
            dataService.getHistoryDetail(function(data1) {
               details(data1);
            });

            var getDetails = function(url) {
                dataService.getPost(url,
                    function(data) {
                        var zz = data;
                        detailHist1(zz);
                        console.log(zz);
                    });
            }
            return {
                getDetails, details
            };
        }
    });