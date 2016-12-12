(function (undefined) {
    require.config({
        baseUrl: "js",
        paths: {
            "jquery": "lib/jquery/dist/jquery.min",
            "knockout": "lib/knockout/dist/knockout",
            "text": "lib/requirejs-text/text",
            "boostrap": "lib/boostrap/dist/bootstrap",
            "toastr": "lib/toastr/toastr.min",
            "dataservice": "app/services/dataService",
            "postbox": "app/services/postbox",
            "config": "app/config"
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
        ko.components.register("search-detail", {
            viewModel: { require: 'app/components/search/searchDetail' },
            template: { require: 'text!app/components/search/searchDetailView.html' }
        });

        ko.components.register('search-history',
            {
                viewModel: { require: 'app/components/history/historyList' },
                template: { require: 'text!app/components/history/historyListView.html' }
            });
        ko.components.register('history-detail',
        {
            viewModel: { require: 'app/components/history/historyDetail' },
            template: { require: 'text!app/components/history/historyDetailView.html' }
        });
    });

    require(['knockout'], function (ko) {
        ko.applyBindings();
    });

})();