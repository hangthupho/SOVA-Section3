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
/*
function PagerModel(records)
{
	var self = this;
	self.pageSizeOptions = ko.observableArray([1, 5, 25, 50, 100, 250, 500]);
	
	self.records = GetObservableArray(records);
	self.currentPageIndex = ko.observable(self.records().length > 0 ? 0 : -1);
	self.currentPageSize = ko.observable(25);
	self.recordCount = ko.computed(function() {
		return self.records().length;
	});
	self.maxPageIndex = ko.computed(function() {
		return Math.ceil(self.records().length / self.currentPageSize()) - 1;
	});
	self.currentPageRecords = ko.computed(function() {
		var newPageIndex = -1;
		var pageIndex = self.currentPageIndex();
		var maxPageIndex = self.maxPageIndex();
		if (pageIndex > maxPageIndex)
		{
			newPageIndex = maxPageIndex;
		}
		else if (pageIndex == -1)
		{
			if (maxPageIndex > -1)
			{
				newPageIndex = 0;
			}
			else
			{
				newPageIndex = -2;
			}
		}
		else
		{
			newPageIndex = pageIndex;
		}
		
		if (newPageIndex != pageIndex)
		{
			if (newPageIndex >= -1)
			{
				self.currentPageIndex(newPageIndex);
			}

			return [];
		}

		var pageSize = self.currentPageSize();
		var startIndex = pageIndex * pageSize;
		var endIndex = startIndex + pageSize;
		return self.records().slice(startIndex, endIndex);
	}).extend({ throttle: 5 });
	self.moveFirst = function() {
		self.changePageIndex(0);
	};
	self.movePrevious = function() {
		self.changePageIndex(self.currentPageIndex() - 1);
	};
	self.moveNext = function() {
		self.changePageIndex(self.currentPageIndex() + 1);
	};
	self.moveLast = function() {
		self.changePageIndex(self.maxPageIndex());
	};
	self.changePageIndex = function(newIndex) {
		if (newIndex < 0
			|| newIndex == self.currentPageIndex()
			|| newIndex > self.maxPageIndex())
		{
			return;
		}

		self.currentPageIndex(newIndex);
	};
	self.onPageSizeChange = function() {
		self.currentPageIndex(0);
	};
	self.renderPagers = function() {
		var pager = "<div><a href=\"#\" data-bind=\"click: pager.moveFirst, enable: pager.currentPageIndex() > 0\">&lt;&lt;</a><a href=\"#\" data-bind=\"click: pager.movePrevious, enable: pager.currentPageIndex() > 0\">&lt;</a>Page <span data-bind=\"text: pager.currentPageIndex() + 1\"></span> of <span data-bind=\"text: pager.maxPageIndex() + 1\"></span> [<span data-bind=\"text: pager.recordCount\"></span> Record(s)]<select data-bind=\"options: pager.pageSizeOptions, value: pager.currentPageSize, event: { change: pager.onPageSizeChange }\"></select><a href=\"#\" data-bind=\"click: pager.moveNext, enable: pager.currentPageIndex() < pager.maxPageIndex()\">&gt;</a><a href=\"#\" data-bind=\"click: pager.moveLast, enable: pager.currentPageIndex() < pager.maxPageIndex()\">&gt;&gt;</a></div>";
		$("div.Pager").html(pager);
	};
	self.renderNoRecords = function() {
		var message = "<span data-bind=\"visible: pager.recordCount() == 0\">No records found.</span>";
		$("div.NoRecords").html(message);
	};

	self.renderPagers();
	self.renderNoRecords();
}
*/