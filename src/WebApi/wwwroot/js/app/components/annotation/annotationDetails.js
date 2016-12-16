define(['knockout', 'postbox', 'config', 'toastr','dataservice'], function (ko, postbox, config, toastr, dataservice) {
    return function (params) {
        var annotation = ko.observable(params.annotation);
        var annotationsR = ko.observableArray(params.annotations);
        //change comment detail then update the object to postbox as observable pattern 
        var saveAnnotation = function () {
            //tell aplication to save annotation and send parameter too
            postbox.publish(config.events.saveAnnotation, ko.toJS(annotation));
            toastr.success("Annotation saved!");
            var annoPut = ko.toJS(annotation);
            //save application to database
           dataservice.putAnno(annoPut,annoPut.annotationId,function(result) {
                
            });
        };
        //delete comment then send the id of the selected comment to observable postbox
        var deleteAnnotation = function () {
            console.log(ko.toJS(annotationsR));
            var annoDel = ko.toJS(annotation);
            toastr.success("Annotation deleted!");
            //save application to database
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
