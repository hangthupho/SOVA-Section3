(function(undefined) {
  
    require.config({
        baseUrl: "js/",
        paths: {
            "text": "lib/requirejs-text/text",
            "jquery": "lib/jquery/dist/jquery",
            "knockout": "lib/knockout/dist/knockout",
            "searchList": "app/components/searchList",
            "bootstrap": "lib/bootstrap/dist/js/bootstrap.min",
            "dataservice": "app/services/dataService",
            "postman": "app/services/postbox",
            "config": "app/config"
        }
    });

    require(['knockout'],
        function(ko) {
            ko.components.register('post-list',
            {
                viewModel: { require: 'app/components/historyList' },
                template: { require: 'text!app/components/historyListView.html' }
            });
            ko.components.register('post-detail',
            {
                viewModel: { require: 'app/components/historyDetail' },
                template: { require: 'text!app/components/historyDetailView.html' }
            });
            ko.components.register("search-list", {
               
                template: { require: 'text!app/components/searchView.html' },
                viewModel: { require: 'searchList' }
            });
            ko.components.register("my-app", {
                viewModel: { require: 'app/components/app/app' },
                template: { require: 'text!app/components/app/appView.html' }
            });

        });
    require(['knockout'],
        function(ko) {
            ko.applyBindings();
        });
})();