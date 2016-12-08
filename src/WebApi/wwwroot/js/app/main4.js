(function(undefined) {
  
    require.config({
        baseUrl: "js/",
        paths: {
            "text": "lib/requirejs-text/text",
            "jquery": "lib/jquery/dist/jquery",
            "knockout": "lib/knockout/dist/knockout",
           "searchList": "app/components/searchList",
            "dataservice": "app/services/dataService"
        }
    });

    require(['knockout'],
        function(ko) {
            ko.components.register('post-list',
            {
                viewModel: { require: 'app/components/postList' },
                template: { require: 'text!app/components/postListView.html' }
            });
            ko.components.register('post-detail',
            {
                viewModel: { require: 'app/components/postList' },
                template: { require: 'text!app/components/historyDetailView.html' }
            });
            ko.components.register("search-list", {
               
                template: { require: 'text!app/components/searchView.html' },
                viewModel: { require: 'searchList' }
            });

        });
    require(['knockout'],
        function(ko) {
            ko.applyBindings();
        });
})();