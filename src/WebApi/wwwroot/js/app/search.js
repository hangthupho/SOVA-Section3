

var searchVM = (function() {
    var id = ko.observable("");
    var postBody = ko.observable("");
    var rank = ko.observable("");

    var self = this;
    var searchList = ko.observableArray([]);
    var search = ko.observable("");
    var clickSearch = function() {
        $.ajax({
            url: '/api/search',
            data: { searchkeyword: search },
            method: 'get',
            dataType: 'json',
            success: function(sdat) {
                for (var i in sdat.list) {
                    var row = sdat.list[i];

                    id = row['id'];
                    postBody = row['postBody'];
                    rank = row['rank'];

                    $('#output')
                        .append("<tr width='50%'><td>" +
                            id +
                            "</td><td>" +
                            postBody +
                            "</td><td>" +
                            rank +
                            "</td></tr>");
                    searchList.push({ id: id, postBody: postBody, rank: rank });
                }
                alert('ok');
               // $('#txtName').val(sdat.id);
                //console.log(sdat);
                console.log(searchList);
            },
            error: function(err) {
                alert('not ok');
            }
        });
    }
    return {
        id, postBody,rank,search,searchList, clickSearch
    }
})();

ko.applyBindings(searchVM);

