
define(['knockout', 'dataservice'], function (ko, dataService) {
    return function () {
        var aList = ko.observableArray([]);
        var adata = ko.observableArray([]);
       

        dataService.getAnnotations(function (data) {
            aList(data);
            for (var i in data.data) {
                var row = data.data[i];
                adata.push(row);
            }
        });

        return {
            aList, adata
           
        };
    };
});
