
define(['knockout', 'dataservice','postman', 'config'],
    function (ko, dataService, postman, config) {
        return function () {
            var self = this;
            var histories = ko.observableArray([]);
            var historynext = ko.observableArray([]);
  
            var hdata = ko.observableArray([]);
           
            var detailHist = ko.observableArray("");
          
            var historyDetail = ko.observable();

          

            
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
            var callbacknext = function(data) {
                historynext(data);
                console.log(data);
            }
            var getNext = function (zz) {
                dataService.getNextHistory(zz.next, callbacknext);
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
                histories, hdata, getDetails, detailHist, historyDetail, historynext, getNext
            };
        };
    });
