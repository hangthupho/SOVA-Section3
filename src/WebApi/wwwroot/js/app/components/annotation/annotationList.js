define(['knockout', 'dataservice', 'postbox', 'config'], function (ko, dataService, postbox, config) {
    return function (params) {
        var annotations = ko.observableArray([]);
        var selectedAnnotation = ko.observable();
        var prevUrl = ko.observable();
        var nextUrl = ko.observable();
        var curPage = ko.observable(params ? params.url : undefined);
        var total = ko.observable();
        var canPrev = function () {
            return prevUrl();
        };

        var canNext = function () {
            return nextUrl();
        };
        var setData = function (result) {
            annotations(result.data);
            console.log(result.data);
            total(result.total);
            prevUrl(result.previous);
            nextUrl(result.next);
            console.log(result.next);
            curPage(result.url);
        };

        var selectAnnotation = function (annotation) {
            selectedAnnotation(annotation);
            postbox.publish(config.events.selectAnnotation, annotation);
        };

        var isSelected = function (annotation) {
            return annotation === selectedAnnotation();
        };
        //
        postbox.subscribe(config.events.saveAnnotation, function (annotation) {
            var annotationArray = annotations();
            for (var i = 0; i < annotationArray.length; i++) {
                if (annotationArray[i].annotationId === annotation.annotationId) {
                    annotationArray[i] = annotation;
                    break;
                }
            }
            annotations(annotationArray);
            selectedAnnotation(annotation);
        });
        //update the array after delete function called
        postbox.subscribe(config.events.deleteAnnotation, function (id) {
            var list = annotations();
            list = list.filter(function (e) {
                if (e.annotationId === id) return false;
                return true;
            });
            annotations(list);


        });
        var showPrev = function () {
            dataService.getAnnotations(prevUrl(), function (result) {
                setData(result);
            });
        };


        var showNext = function () {
            dataService.getAnnotations(nextUrl(), function (result) {
                setData(result);
            });
        };
        dataService.getAnnotations(curPage(), function (result) {
            setData(result);
        });

        return {
            annotations,
            selectAnnotation,
            isSelected,
            total,
            canPrev,
            canNext,
            showPrev,
            showNext
        };
    };
});

