function dealModel() {
    var self = this;
    self.records = ko.observableArray([]);

    $.getJSON("/api/history", function (data) {
        self.records(data);
    })
}
ko.applyBindings(new dealModel());