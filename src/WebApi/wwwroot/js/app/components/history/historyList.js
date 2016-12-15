﻿
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
                hdata(result.data);
            
                total(result.total);
         
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
               

            });

            var getDetails = function (xx) {
                var str = xx.searchString;
                //dataService.getHistoryDetails(xx.url, callback);
                postbox.publish(config.events.selectSearch, { str });
                
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
