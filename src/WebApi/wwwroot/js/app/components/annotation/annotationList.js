define(['knockout', 'dataservice', 'postbox', 'config'], function (ko, dataService, postbox, config) {
    return function () {
        var annotations = ko.observableArray([]);
        var selectedAnnotation = ko.observable();

        var selectAnnotation = function (annotation) {
            selectedAnnotation(annotation);
            postbox.publish(config.events.selectAnnotation, annotation);
        };

        var isSelected = function (annotation) {
            return annotation === selectedAnnotation();
        };

        postbox.subscribe(config.events.saveAnnotation, function (annotation) {
            var annotationArray = annotations();
            for (var i = 0; i < annotationArray.length; i++) {
                if (annotationArray[i].AnnotationId === annotation.AnnotationId) {
                    annotationArray[i] = annotation;
                    break;
                }
            }
            annotations(annotationArray);
            selectedAnnotation(annotation);
        });

        dataService.getAnnotations(function (data) {
            annotations(data);
        });

        return {
            annotations,
            selectAnnotation,
            isSelected
        };
    };
});
