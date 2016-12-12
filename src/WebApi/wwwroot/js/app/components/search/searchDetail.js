define(['knockout', 'dataservice', 'postbox', 'config'],
    function (ko, dataService, postbox, config) {
        return function (params) {
            //var detailHist1 = ko.observableArray([""]);
            //    return function(params) {
            //    var url = params.url;
            var pLink = params.pLink;
            var tit = params.tit;
            var body = params.body;
            var ans = params.ans;

            return {
                pLink, tit, body, ans
            };
        }
    });