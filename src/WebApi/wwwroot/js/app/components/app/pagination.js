define(['knockout'], function (ko) {

        //====== Pagination ========
        var PagerModel = function (collection, options) {
            var self = this;
            var defaultSize = 10;
            var defaultPage = 1;
            options = options || { size: defaultSize };

            self.items = collection;
            self.totalItemCount = ko.computed(function () {
                return self.items().length;
            });
            self.pageSize = ko.observable(options.size || defaultSize);
            self.pageNumber = ko.observable(defaultPage);

            self.pageCount = ko.computed(function () {
                return self.totalItemCount() > 0 ? Math.ceil(self.totalItemCount() / self.pageSize()) : 0;
            });

            self.allPages = ko.computed(function () {
                var foo = [];
                for (var i = 1; i <= self.pageCount(); i++) {
                    foo.push(i);
                }
                return foo;
            });

            self.hasNextPage = ko.computed(function () {
                return self.pageNumber() > 1;
            });

            self.isFirstPage = ko.computed(function () {
                return self.pageNumber() === 1;
            });

            self.isLastPage = ko.computed(function () {
                return self.pageNumber() >= self.pageCount();
            });

            self.firstItemOnPage = ko.computed(function () {
                return (self.pageNumber() - 1) * self.pageSize() + 1;
            });

            self.lastItemOnPage = ko.computed(function () {
                var num = self.firstItemOnPage() + self.pageSize() - 1;
                var result = num > self.totalItemCount() ? self.totalItemCount() : num;
                return result;
            });

            self.previousPage = function () {
                if (!self.isFirstPage()) {
                    self.pageNumber(self.pageNumber() - 1);
                }
            };
            self.nextPage = function () {
                if (!self.isLastPage()) {
                    self.pageNumber(self.pageNumber() + 1);
                }
            };

            self.moveToPage = function (index) {
                if (index <= self.pageCount() && index >= 1) {
                    self.pageNumber(index);
                }
            };

            self.pagedItems = ko.computed(function () {
                
                return self.items.slice(self.firstItemOnPage() - 1, self.lastItemOnPage());
            });

            self.isCurrentPage = function (value) {
                return self.pageNumber() === value;
            };
        };
        return {
            PagerModel         
        };
});