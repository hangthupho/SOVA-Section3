define(['jquery'], function ($) {
    var dataservice = {};
    var getHistory = function (callback) {
       var url = "api/history/";
        $.getJSON(url, function (data) {
           callback(data);
            console.log(data);
            
        });
    }

    var getPost = function(url, callback) {
        $.getJSON(url, callback);
    };

    var getHistoryPage = function(callback) {
        var url = 'api/history';
        $.ajax({
            dataType:"html",
            url: url,
            method: 'get',
            data: { page:"2", pagesize: "5" },
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
        getHistory, getHistoryPage, getHistoryId, getSearch, getPost, getHistoryDetail, getPostDetails
   };
});




