function App() {
    var self = this;

    /**
     * Categories e.g. credit cards, home loans e.t.c
     *
     * @type {*} ComparableItemCategory[]
     */
    self.views = ko.observableArray([
        new CreditCardView(),
        new CarLoanView(),
        new BasicView("Term Deposits", "/images/termdeposits.png",ComparableCategoryType.TERM_DEPOSITS,[]),
        new BasicView("Home Loans", "/images/homeloans.png",ComparableCategoryType.HOME_LOANS,[]),
        new BasicView("Savings Accounts", "/images/savingsaccounts.png",ComparableCategoryType.SAVINGS_ACCOUNTS,[]),
        new BasicView("Personal Loans", "/images/personalloans.png",ComparableCategoryType.PERSONAL_LOANS,[])
    ]);

    /**
     * Selected category
     *
     * @type {*} ComparableItemCategory
     */
    self.selectedView = ko.observable();

    self.selectView = function(view) {
        location.hash = view.type;
    };


//    self.prepareView = function(elements) {
//        debugger;
//    }


    Sammy(function() {

        this.get('#:view', function() {
            _view = _.find(self.views(), function (view) { return view.type == this.params.view; }, this);
            if (_view) self.selectedView(_view);
        });

        this.get('', function() {
            self.selectedView(null);
        });

    }).run();
}

ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function(element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).fadeIn("fast") : $(element).slideUp();
    }
};

$(function() {
    ko.applyBindings(new App(), $("#main")[0]);
});





