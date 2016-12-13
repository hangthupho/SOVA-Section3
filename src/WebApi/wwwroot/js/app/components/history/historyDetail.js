define(['knockout', 'dataservice', 'postbox', 'config'],
    function (ko, dataService, postbox, config) {
        return function (params) {
           

            var link = ko.observable(params.link);
            var string = ko.observable(params.string);
            var time = ko.observable(params.time);



            return {
                link, string, time,

            };
        }
    });