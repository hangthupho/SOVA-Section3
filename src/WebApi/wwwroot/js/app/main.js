(function (undefined) {
    require.config({
        baseUrl: "js",
        paths: {
            "jquery": "lib/jquery/dist/jquery.min",
            "knockout": "lib/knockout/dist/knockout",
            "text": "lib/requirejs-text/text",
            "boostrap": "lib/boostrap/lib/js/dist/bootstrap.min",
            "toastr": "lib/toastr/toastr.min",
            "dataservice": "app/services/dataService",
            "postbox": "app/services/postbox",
            "config": "app/config",
            "jqcloud2": "lib/jqcloud2/dist/jqcloud.min"
        },
        shim: {
            "bootstrap": { "deps": ['jquery'] }
        }
    });

    require(['knockout'], function (ko) {
        ko.components.register("my-app", {
            viewModel: { require: 'app/components/app/app' },
            template: { require: 'text!app/components/app/appView.html' }
        });
        ko.components.register("annotation-list",
        {
            viewModel: { require: "app/components/annotation/annotationList" },
            template: { require: "text!app/components/annotation/annotationListView.html" }
        });
        ko.components.register("annotation-details",
        {
            viewModel: { require: "app/components/annotation/annotationDetails" },
            template: { require: "text!app/components/annotation/annotationDetailsView.html" }
        });
        ko.components.register("search-list",
        {
            viewModel: {
                require: "app/components/search/search" },
            template: { require: "text!app/components/search/searchView.html" }
        });
        ko.components.register("word-cloud",
        {
            viewModel: {
                require: "app/components/wordcloud/wordcloud" },
            template: { require: "text!app/components/wordcloud/wordcloudView.html" }
        });
    });

    require(['knockout'], function (ko) {
        ko.applyBindings();
    });

})();