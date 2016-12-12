define(['knockout', 'dataservice', 'postman', 'config'],
    function (ko, dataService, postman, config) {
        return function (params) {
            //var detailHist1 = ko.observableArray([""]);
            //    return function(params) {
            //    var url = params.url;
            var annoPost = function(data) {
                this.id = ko.observable(data);
                //this.commentBody = ko.observable(data.commentBody);
            };

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
            var clickPost = function () {
                dataService.postAnno(annoPost(), function () {
                    console.log(annoPost);

                });
            };
            return {
                //pLink, tit, body, ans,
                title, postBody, url, score, createdDate, answers, annoPost, clickPost
            };
        }
    });