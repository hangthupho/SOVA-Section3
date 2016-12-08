
var postVM = (function() {
    var self = this;
    var total = ko.observable("");
    var previous = ko.observable("");
    var next = ko.observable("");
    
    self.lp = ko.observableArray([]);
    var url1 = ("");
    $.ajax({
        url: '/api/posts',
        data: {},
        method: 'get',
        dataType: 'json',
        success: function(pdat) {
            self.lp(pdat);
            for (var i in pdat.pList) {
                var row = pdat.pList[i];

                var title = row['title'];
                 var url1 = row['url'];
                var userName = row['userName'];

                $('#output').append("<tr width='50%'><td>" + title + "</td></tr>");
                $('#output1').append("<tr width='50%'><td>" + url1 + "</td></tr>");
                $('#output2').append("<tr width='50%'><td>" + userName + "</td></tr>");

            }
            alert('ok');

            console.log(pdat);
        },
        error: function(err) {
            alert('not ok');
        }
    });
});


ko.applyBindings(postVM);
