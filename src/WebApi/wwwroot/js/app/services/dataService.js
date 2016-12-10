define(['jquery'], function ($) {
    var histUrl = "api/history/";
    var getHistory = function(url, callback) {
        if (url === undefined) {
            url = histUrl;
        }
        $.getJSON(url,
            function(data) {
                callback(data);
                console.log(data);

            });
    };

   

    var getAnnotations = function (callback) {
        var url = "api/annotations/";
        $.getJSON(url, function (data) {
            callback(data);
            console.log(data);

        });
    }

    var getPost = function(url, callback) {
        $.getJSON(url, callback);
    };

    var getPostId= function(id, callback) 
    {
        alert('ok');
        $.getJSON('api/posts/'+id, callback);
    }

    var getPost1 = function(callback) {
        var url = 'api/posts';
        $.ajax({
            dataType:"json",
            url: url,
            method: 'get',
            data: { },
            success: function(data) {
                callback(data);
                console.log(data);
            }
        });
    }
   
    
    var getSearch = (function(search, callback) {
        $.ajax({
            url: '/api/search',
            data: { searchkeyword: search },
            method: 'get',
            dataType: 'json',
            success: function(sdat) {
                callback(sdat);
                alert('ok');
           },
            error: function(err) {
                alert('not ok');
            }
        });
    });
   

    var getHistoryDetails = function (url, callback) {
        $.getJSON(url, function (data) {
            callback(data);
        });
    }
    return {
        getHistory, getSearch, getPost, getHistoryDetails, getPost1, getPostId, getAnnotations
   };
});




