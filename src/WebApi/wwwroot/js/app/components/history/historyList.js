
define(['knockout', 'dataservice', 'postbox', 'config', 'toastr'],
    function (ko, dataService, postbox, config, toastr) {
        return function (params) {
            var histories = ko.observableArray([]);
            var hdata = ko.observableArray([]);
            var page = ko.observable(params ? params.text : undefined);
            var prevUrl = ko.observable();
            var nextUrl = ko.observable();
            var curPage = ko.observable(params ? params.url : undefined);
            var total = ko.observable();
        
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
            //turn to previous page then refresh the page by getting data from dataservice
            var showPrev = function () {
                dataService.getHistory(prevUrl(), function (result) {
                    setData(result);

                });
            }
           
            // show the next page, refresh th page by getiing data from dataservice and get parameter 
            //from dataservice by postbox to show page number
            var showNext = function() {
                dataService.getHistory(nextUrl(),
                    function(result) {
                        setData(result);
                        postbox.subscribe(config.events.pageNumber,
                            function(params) {
                                page(params.text);
                                console.log(params);
                                
                            });
                    });
            }
            
            //get update value page and total from observable value page and total
            var update = function () {
                return page,
                    total;

            }
        //Jump to the selected number of page
            var showJump = function() {
                update();
                console.log(total());
                console.log(page());
                var totalPage = total() / 20;
                //set the limit
                if (page() < totalPage && page().match(/^-?\d+$/)) {
                    dataService.getHistoryPage(page,
                        function (result) {
                            setData(result);
                        });
                }
                else {
                    toastr.warning('PLease enter valid Value! max: ' + parseInt(totalPage) + ' page(s)');
                   
                }
            }
            //get data from url by dataservice
            dataService.getHistory(curPage(), function (result) {
                setData(result);
            });

            var getDetails = function (xx) {
                var str = xx.searchString;
                postbox.publish(config.events.selectSearch, { str });
                
            };

            return {
                histories, hdata, getDetails, 
                total,
                canPrev,
                canNext,
                showPrev,
                showNext, showJump, page
            };
        };
    });
