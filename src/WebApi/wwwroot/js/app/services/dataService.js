define(['jquery'], function ($) {

    var getAnnotations = function (callback) {
        $.getJSON("api/annotations", function (data) {
            callback(data.data);
        });  
    };

    var getWordCloud = function (searchValue, callback) {
        return $.ajax({
            type: "GET",
            url: "api/wordcloud/" + searchValue,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                callback(data);
            }
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

    var updateStatus = function (id, status, callback) {
        status = status ? 1 : 0;
        var tmp = JSON.stringify({ PostId: id, Status: status });
        $.ajax({
            contentType: "application/json",
            url: 'api/marking/'+ id,
            data: tmp,
            type: 'PUT',
            dataType: 'json',
            success: function (data) {
                callback(data);
            }
        });
    };

    return {
        getAnnotations,
        getSearchedResults,
        updateStatus,
        getWordCloud
    };
});



