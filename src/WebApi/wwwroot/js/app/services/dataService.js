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

    var getPostId = function (id, callback) {
        //alert('ok');
        $.getJSON('api/posts/' + id, callback);
    }
    var getHistoryDetails = function (url, callback) {
        $.getJSON(url, function (data) {
            callback(data);
        });
    }
    var histUrl = "api/history/";
    var getHistory = function (url, callback) {
        if (url === undefined) {
            url = histUrl;
        }
        $.getJSON(url,
            function (data) {
                callback(data);
                //console.log(data);

            });
    };
    var postAnno = function (annoPost) {
        
        $.ajax({
            url: "/api/annotations/",
            type: 'POST',
            data: JSON.stringify(annoPost),
            contentType: "application/json; charset=utf-8",
            dataType: 'application/json',
            success: function(data) {
                alert(data);
            },
            statusCode: {
                404: function() {
                    alert('Failed');
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(xhr.responseText);
                    alert(thrownError);
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            }
        });
    };
    return {
        getAnnotations,
        getSearchedResults, getPostId, getHistoryDetails, getHistory, postAnno
    };
});



