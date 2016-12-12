
define(['knockout', 'dataservice', 'postbox', 'config'],
    function (ko, dataService, postbox, config) {
        return function (params) {

            var histories = ko.observableArray([]);

            var hdata = ko.observableArray([]);

            var detailHist = ko.observableArray("");

            var historyDetail = ko.observable();
            var prevUrl = ko.observable();
            var nextUrl = ko.observable();
            var curPage = ko.observable(params ? params.url : undefined);
            var total = ko.observable();

            var callback = function (data) {
                historyDetail(data);

            };
            var canPrev = function () {
                return prevUrl();
            };

            var canNext = function () {
                return nextUrl();
            };

            var setData = function (result) {
                histories(result);
                hdata(result.hist);
                //historyDetail(result.hist);
                total(total);
                // console.log(total);
                prevUrl(result.previous);

                nextUrl(result.next);

                curPage(result.url);

            };
            var showPrev = function () {
                dataService.getHistory(prevUrl(), function (result) {
                    setData(result);
                });
            }

            // show the next page
            var showNext = function () {
                dataService.getHistory(nextUrl(), function (result) {
                    setData(result);
                });
            }
            dataService.getHistory(curPage(), function (result) {
                setData(result);
                // console.log(histories);

                //for (var i in result.hist) {
                //    var row = result.hist[i];
                //    hdata.push(row);
                //}


                // console.log(hdata);
                //console.log(histories);

            });

            var getDetails = function (xx) {
                dataService.getHistoryDetails(xx.url, callback);


                //window.location.href = '';
                //postman.publish(
                //    config.events.changeMenu,
                //    config.menuItems.details);
            };

            return {
                histories, hdata, getDetails, detailHist, historyDetail,
                total,
                canPrev,
                canNext,
                showPrev,
                showNext
            };
        };
    });
