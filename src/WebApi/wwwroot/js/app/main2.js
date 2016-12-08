$(document).ready(function() {
    $.ajax({
        cache: false,
        type: "GET",
        url: "/api/history",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {},
        success: function (data) {
            alert('ok');
            $('#body').html(data);
            console.log(data);
        },
        error: function (err) {
            alert('not ok')
            alert(err.status + " : " + err.statusText);
        }
    });
})