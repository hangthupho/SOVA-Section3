define(['jquery'], function ($) {
    var anUrl = "api/annotations";
    var getAnnotations = function (url,callback) {
        if (url === undefined) {
            url = anUrl;
        }
        $.getJSON(url, function (data) {
            callback(data);
            console.log(data);
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

    var getSearchedBmResults = function (searchValue, callback) {
        return $.ajax({
            type: "GET",
            url: "api/searchbm/" + searchValue,
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
                }
            }
        });
    };

    var putAnno = function (annoPut, id) {
      
       $.ajax({
            url: "/api/annotations/" +id,
            type: 'PUT',
            data: JSON.stringify(annoPut),
            contentType: "application/json; charset=utf-8",
            dataType: 'application/json',
            success: function (data) {
                alert(data);
            },
            statusCode: {
                404: function () {
                    alert('Failed');
                }
                
            }
        });
    };
    var delAnno = function (id) {

        $.ajax({
            url: "/api/annotations/" + id,
            type: 'DELETE',
            success: function (data) {
                alert(data);
            },
            statusCode: {
                404: function () {
                    alert('Failed');
                }

            }
        });
    };
    return {
        getAnnotations,
        getSearchedResults, getPostId, getHistoryDetails, getHistory, postAnno, putAnno, delAnno, getSearchedBmResults
    };
});



