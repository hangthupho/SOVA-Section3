
$(document).ready(function () {
     $('#btnGetPost')
         .click(function() {
            var search = $('#txtString').val();
             $.ajax({
                 url: '/api/search',
                 data: { searchkeyword:search },
                 method: 'get',
                dataType: 'json',
                success: function (sdat) {
                    for (var i in sdat.list) {
                        var row = sdat.list[i];

                        var id = row['id'];
                        var postBody = row['postBody'];
                        var rank = row['rank'];

                        $('#output').append("<tr width='50%'><td>" + id + "</td><td>" + postBody + "</td><td>" + rank + "</td></tr>");
                    }
                    alert('ok');
                   // $('#txtName').val(sdat.id);
                    console.log(sdat);
                },
                 error: function(err) {
                     alert('not ok');
                 }
             });
         });
})

//function searchViewModel(sdat) {
//    this.id = ko.observable(sdat.list.id);
//    this.previous = ko.observable(sdat.list.postBody);
//    this.next = ko.observable(sdat.list.rank);
    

//}