define(['knockout', 'dataservice', 'postbox', 'config'],
    function (ko, dataService, postbox, config) {
        return function (params) {
            //var detailHist1 = ko.observableArray([""]);
            //    return function(params) {
            //    var url = params.url;

            var link = ko.observable(params.link);
            var string = ko.observable(params.string);
            var time = ko.observable(params.time);


            //var showHistory = function () {

            //    postman.publish(
            //        config.events.changeMenu,
            //        { title: config.menuItems.details, params });
            //};

            return {
                link, string, time,

                //showHistory,
                //histo, showHistory
            };
        }
    });