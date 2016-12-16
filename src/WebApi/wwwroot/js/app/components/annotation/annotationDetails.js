define(['knockout', 'postbox', 'config', 'toastr', 'dataservice'], function (ko, postbox, config, toastr, dataservice) {
    return function (params) {
        var annotation = ko.observable(params.annotation);
        var annotationsR = ko.observableArray(params.annotations);

        var saveAnnotation = function (data) {
            postbox.publish(config.events.saveAnnotation, ko.toJS(annotation));
            toastr.success("Annotation saved!");
            var annoPut = ko.toJS(annotation);
            dataservice.putAnno(annoPut, annoPut.annotationId, function (result) {

            });
        };
        var deleteAnnotation = function () {
            console.log(ko.toJS(annotationsR));
            var annoDel = ko.toJS(annotation);
            toastr.success("Annotation deleted!");
            dataservice.delAnno(annoDel.annotationId, function (result) {

                postbox.publish(config.events.deleteAnnotation, result);
            });

        };


        postbox.subscribe(config.events.selectAnnotation, function (p) {
            annotation(p);
        });
        return {
            annotation,
            saveAnnotation,
            deleteAnnotation
        };
    };
});
