
define(['knockout', 'dataservice','postman', 'config'],
    function (ko, dataService, postman, config) {
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
            var selectedHistory = ko.observable();
            var historyDetail = ko.observable();

            var selectHistory = function (hist) {
                selectedHistory(hist);
                postman.publish(config.events.selectHistory, hist);
            }

            var isSelected = function (hist) {
                return hist === selectedHistory();
            }
            //var getDetails = function(xx) {
            //    postman.publish({
            //        component: 'post-detail',
            //        params: { url: xx.url }
            //    });

            //}

            //var getDetails = function (xx) {
            //    dataService.getPost(xx.url,
            //         function (data) {
            //             var zz = data;
            //             detailHist(zz);
            //             console.log(zz);
            //         });

            //}

            var callback = function(data) {
                historyDetail(data);
                
            };

            var getDetails = function (xx) {
                dataService.getPostDetails(xx.url, callback);
                
                
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
                histories, hdata, getDetails, detailHist, selectHistory, historyDetail
            };
        };
    });
