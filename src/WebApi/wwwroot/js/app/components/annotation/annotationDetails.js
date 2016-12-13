define(['knockout', 'postbox', 'config', 'toastr','dataservice'], function (ko, postbox, config, toastr, dataservice) {
    return function (params) {
        var annotation = ko.observable(params.annotation);
        console.log(JSON.stringify(ko.toJS(annotation)));
        var saveAnnotation = function () {
            postbox.publish(config.events.saveAnnotation, ko.toJS(annotation));

            toastr.success("Annotation saved!");
            var stjson = JSON.stringify(annotation);
            console.log(annotation);
           var annoPut = ko.toJS(annotation);
           console.log(annoPut.annotationId);
           console.log(JSON.stringify(annoPut));
           
               dataservice.putAnno(annoPut,annoPut.annotationId,function(result) {
                   console.log(result);
            });
           };
        var deleteAnnotation = function () {
            postbox.publish(config.events.saveAnnotation, ko.toJS(annotation));
            var annoDel = ko.toJS(annotation);
            toastr.success("Annotation deleted!");
            dataservice.delAnno(annoDel.annotationId, function (result) {
                console.log(result);
                
            });
            console.log(JSON.stringify(ko.toJS(annotation)));
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
