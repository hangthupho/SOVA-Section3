
define(['knockout', 'dataservice'],
    function (ko, dataService) {
        return function () {
            var self = this;
            var histories = ko.observableArray([]);
            var histories1 = ko.observableArray([]);
            var histories2 = ko.observableArray([]);
            var hdata = ko.observableArray([]);
            var url = ko.observable("");
            var searchString = ko.observable("");
            var searchTime = ko.observable("");
            var textH = {};
            var detailHist = ko.observableArray("");

            var getDetails = function(xx) {
                dataService.getPost(xx.url, function (data) {
                    var zz = data;
                    detailHist(zz);
                    console.log(zz);
                });
            }
            
            dataService.getHistory(function (data1) {
                histories(data1);

                for (var i in data1.hist) {
                    var row = data1.hist[i];
                    hdata.push(row);
                }
               
               
                console.log(hdata);
                //console.log(histories);

            });

            return {
                histories, hdata, histories1, histories2, getDetails, detailHist
            };
        };
    });
