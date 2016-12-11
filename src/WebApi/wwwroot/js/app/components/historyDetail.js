define(['knockout', 'dataservice', 'postman', 'config'],
    function(ko, dataService, postman, config) {
        return function(params) {
        //var detailHist1 = ko.observableArray([""]);
        //    return function(params) {
            //    var url = params.url;
         
            var link = ko.observable(params.xx.url);
            var string = ko.observable(params.xx.searchString);
            var time = ko.observable(params.xx.searchTime);

            var xx = ko.observable(params.xx);
            console.log(xx);
            //var showHistory = function () {
              
            //    postman.publish(
            //        config.events.changeMenu,
            //        { title: config.menuItems.details, params });
            //};

            return {
                link, string, time,
                xx
                //showHistory,
               //histo, showHistory
            };
        }
    });