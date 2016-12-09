define(['jquery'], function ($) {
 
    var getHistory = function (callback) {
       var url = "api/history/";
        $.getJSON(url, function (data) {
           callback(data);
            console.log(data);
            
        });
    }

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
   
    var getHistoryId = function(callback) {
        var url = 'api/history/';
        var id = "1";
        $.ajax({
            dataType: "json",
            url: url + id,
            method: 'get',
            data: { page: "2", pagesize: "5" },
            success: function (data) {
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
    var getHistoryDetail = function (callback) {
        var url = "api/history/1";
        $.getJSON(url, function (data) {
            callback(data);
            //console.log(data);

        });
    }

    var getPostDetails = function (url, callback) {
        $.getJSON(url, function (data) {
            callback(data);
        });
    }
    return {
        getHistory, getHistoryId, getSearch, getPost, getPostDetails, getPost1, getPostId, getAnnotations
   };
});




