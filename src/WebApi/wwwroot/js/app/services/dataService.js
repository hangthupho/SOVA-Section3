define(['jquery', 'postbox', 'config'], function ($, postbox, config) {
    var anUrl = "api/annotations";
    var histUrl = "api/history/";
    var getAnnotations = function (url, callback) {
        if (url === undefined) {
            url = anUrl;
        }
        var gotData = function (data) {
            console.log('after callback');
            callback(data);
        }
        $.getJSON(url, gotData);
        console.log('after post');
    };

    var getSearchedResults = function (searchValue, callback) {
        console.log("first");
        return $.ajax({
            type: "GET",
            url: "api/search/" + searchValue,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                callback(data);
                console.log(data);
            }

        });
    };

    var getHistoryPage = function (page, callback) {
        var pageSize = 10;

        $.ajax({
            url: histUrl,
            data: { page: page, pagesize: pageSize },
            method: 'get',
            dataType: 'json',
            success: function (data) {
                callback(data);
            },
            error: function (err) {
                alert('not ok');
            }
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


    var getSearchedBmResults = function (searchValue, callback) {
        return $.ajax({
            type: "GET",
            url: "api/bestmatchsearch/" + searchValue,
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

    var getHistory = function (url, callback) {


        if (url === undefined) {
            url = histUrl;
        }
        var text1 = (url.substring(url.indexOf("&") - 1));
        var text = text1.substring(0, text1.indexOf("&"));
        postbox.publish(config.events.pageNumber, { text });
        $.getJSON(url,
            function (data) {
                callback(data);
            });
    };
    var postAnno = function (annoPost) {

        $.ajax({
            url: "/api/annotations/",
            type: 'POST',
            data: JSON.stringify(annoPost),
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

    var putAnno = function (annoPut, id) {

        $.ajax({
            url: "/api/annotations/" + id,
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
    var delAnno = function (id, callback) {

        $.ajax({
            url: "/api/annotations/" + id,
            type: 'DELETE',
            success: function (data) {
                callback(id);
            },
            error: function (error) {
                console.log(error);
            },
            statusCode: {
                404: function () {
                    alert('Failed');
                }

            }
        });
    };
    var updateStatus = function (id, status, callback) {
        status = status ? 1 : 0;
        var tmp = JSON.stringify({ PostId: id, Status: status });
        $.ajax({
            contentType: "application/json",
            url: 'api/marking/' + id,
            data: tmp,
            type: 'PUT',
            dataType: 'json',
            success: function (data) {
                callback(data);
            }
        });
    };
    return {
        getAnnotations, getHistoryPage, updateStatus,
        getSearchedResults, getPostId, getHistoryDetails, getHistory, postAnno, putAnno, delAnno, getSearchedBmResults, getWordCloud
    };
});