define(['knockout', 'dataservice', 'postman', 'config'],
    function(ko, dataService, postman, config) {
        return function(params) {
        //var detailHist1 = ko.observableArray([""]);
        //    return function(params) {
        //    var url = params.url;
            var link = params.link;
            var string = params.string;
            var time = params.time;
            return {
                link, string, time
            };
        }
    });