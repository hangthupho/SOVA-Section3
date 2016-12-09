define(['knockout', 'postbox', 'config', 'toastr'], function (ko, postbox, config, toastr) {
    return function (params) {
        var annotation = ko.observable(params.annotation);

        var saveAnnotation = function () {
            postbox.publish(config.events.saveAnnotation, ko.toJS(annotation));
            toastr.success("Annotation saved!");
        };

        postbox.subscribe(config.events.selectAnnotation, function (p) {
            annotation(p);
        });



        return {
            annotation,
            saveAnnotation
        };
    };
});
