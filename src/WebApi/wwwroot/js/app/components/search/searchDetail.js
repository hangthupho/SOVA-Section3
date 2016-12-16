define(['knockout', 'dataservice', 'postbox', 'config', 'toastr'],
    function (ko, dataService, postbox, config, toastr) {
       
        return function (params) {
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
            var comment = ko.observable("");
            var id = ko.observable(loc);

            var annoPost = {};

            var clickPost = function() {
                dataService.postAnno(annoPost =
                    { postId: loc, annotationBody: comment() },
                    function() {
                        console.log(annoPost);
                    });
                toastr.success("Your personal comment added!");
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