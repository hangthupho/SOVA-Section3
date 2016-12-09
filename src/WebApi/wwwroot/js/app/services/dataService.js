define(['jquery'], function ($) {

    var getAnnotations = function (callback) {
        $.getJSON("api/annotations", function (data) {
            callback(data.data);
        });  
    };
    
    var getSearchedResults = function (searchValue, callback) {
       return $.ajax({
            type: "GET",
            url: "api/search/" + searchValue,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                callback(data);
            }
        });
    };

    return {
        getAnnotations,
        getSearchedResults
    };
});



