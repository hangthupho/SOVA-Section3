define(['knockout', 'dataservice', 'postbox', 'config', 'toastr'],
    function (ko, dataService, postbox, config, toastr) {
        return function(params) {
            //var detailHist1 = ko.observableArray([""]);
            //    return function(params) {
            //    var url = params.url;
           
                $('#qnimate').addClass('popup-box-on');
                $("#removeClass").click(function () {
                    $('#qnimate').removeClass('popup-box-on');
                });
            var pLink = params.pLink;
            var tit = params.tit;
            var body = params.body;
            var ans = params.ans;

            var text = pLink;
            var parts = text.split('/');
            var loc = parts.pop();
            var self = this;
            var comment = ko.observable("");
            var id = ko.observable(loc);

            var annoPost = {};

            var clickPost = function() {
                dataService.postAnno(annoPost =
                    { postId: loc, commentBody: comment() },
                    function() {
                        console.log(annoPost);
                        
                    });
              };
            return {
                pLink,
                tit,
                body,
                ans,
                annoPost,
                clickPost,
                id,
                comment
            };
        }
    });