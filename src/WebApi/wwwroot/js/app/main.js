var urlPath = window.location.pathname;
$(function () {
    var postListVm = new PostListVM();
    ko.applyBindings(postListVm);
   
});

//View Model
function PostListVM() {
    
   
        var self = this;
        self.PostList = ko.observableArray([]);
        self.dataList = ko.observableArray([]);
        self.StringList = ko.observableArray([]);
        self.TimeList = ko.observableArray([]);
       
        $.ajax({
            cache: false,
            type: "GET",
            url: "/api/history",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            
           
            success: function (data1) {
                alert('ok');
                //var data2 = $.parseJSON(data1);
                var output = "";
                self.PostList(data1); //Put the response in ObservableArray
                //self.dataList(data1.hist);
                for (var i in data1.hist) {
                    var row = data1.hist[i];

                    var url = row['url'];
                    var searchString = row['searchString'];
                    var searchTime = row['searchTime'];

                    $('#output').append("<tr width='50%'><td>" + url + "</td><td>" + searchString + "</td><td>" + searchTime + "</td></tr>");
                }
                //var jdata1 = JSON.stringify(output);
                //data1.push(jdata1);
                
                console.log(output);
                //self.dataList(output);
            },
            error: function (err) {
                alert('not ok');
                alert(err.status + " : " + err.statusText);
            }
        });
    }



//Model
function PostViewModel(data1) {
   this.total = ko.observable(data1.total);
   this.previous = ko.observable(data1.previous);
   this.next = ko.observable(data1.next);
   //this.hist = ko.observable(data1.hist);
   //this.url = ko.observable(data1.hist.url);
   //this.searchString = ko.observable(data1.output.searchString);
   //this.searchTime = ko.observable(data1.output.searchTime);
   
}