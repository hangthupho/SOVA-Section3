define(['knockout', 'dataservice', 'postman', 'config'],
    function (ko, dataService, postman, config) {
        return function (params) {
            //var detailHist1 = ko.observableArray([""]);
            //    return function(params) {
            //    var url = params.url;

            var title = ko.observable(params.data.title);
            var postBody = ko.observable(params.data.postBody);
            var url = ko.observable(params.data.url);
            var score = ko.observable(params.data.score);
            var createdDate = ko.observable(params.data.createdDate);
            var answers = ko.observableArray(params.data.answers);
            console.log(title);
            //var pLink = params.pLink;
            //var tit = params.tit;
            //var body = params.body;
            //var ans = params.ans;

            return {
                //pLink, tit, body, ans,
                title, postBody, url, score, createdDate, answers
            };
        }
    });