/**
 * The category of items that we are comparing,
 *
 * TODO: Move to the server?
 * @param data
 * @constructor
 */
function ComparableItemCategory(data) {
    var self = this;
    this.type = data.type;
    this.title = data.title;
    this.icon = data.icon;
}
/**
 * The types of the comparable
 *
 * @type {Object}
 */
ComparableCategoryType = {
    CREDIT_CARDS: "credit-cards",
    HOME_LOANS: "home-loans",
    PERSONAL_LOANS: "personal-loans",
    SAVINGS_ACCOUNTS: "savings-accounts",
    TERM_DEPOSITS: "term-deposits",
    CAR_LOANS: "car-loans"
}

function App() {
    var self = this;

    /**
     * Categories e.g. credit cards, home loans e.t.c
     *
     * @type {*} ComparableItemCategory[]
     */
    self.categories = ko.observableArray([]);

    /**
     * Selected category
     *
     * @type {*} ComparableItemCategory
     */
    self.selectedCategory = ko.observable();

    /**
     * Load some categories
     */
    self.loadCategories = function() {
        self.categories.push(new ComparableItemCategory({ type: ComparableCategoryType.CREDIT_CARDS, title: "Credit Cards", icon: "/images/creditcards.png" }));
        self.categories.push(new ComparableItemCategory({ type: ComparableCategoryType.HOME_LOANS, title: "Home Loans", icon: "/images/homeloans.png" }));
        self.categories.push(new ComparableItemCategory({ type: ComparableCategoryType.PERSONAL_LOANS, title: "Personal Loans", icon: "/images/personalloans.png" }));
        self.categories.push(new ComparableItemCategory({ type: ComparableCategoryType.SAVINGS_ACCOUNTS, title: "Savings Accounts", icon: "/images/savingsaccounts.png" }));
        self.categories.push(new ComparableItemCategory({ type: ComparableCategoryType.TERM_DEPOSITS, title: "Term Deposits", icon: "/images/termdeposits.png" }));
        self.categories.push(new ComparableItemCategory({ type: ComparableCategoryType.CAR_LOANS, title: "Car Loans", icon: "/images/carloans.png" }));

        console.log("Number of categories loaded " + self.categories().length);
    };



    self.selectCategory = function(category) {
//        self.selectedCategory(category)
        console.log("Selected type " + category.title);
        location.hash = category.type
    };

    self.loadCategories();

    Sammy(function() {

        this.get('#:category', function() {
            console.log("Params is " + this.params.category);
            var cat = this.params.category;
            var category = ko.utils.arrayFilter(self.categories(), function (category) {
                return category.type == cat;
            });

            console.log("Got category " + category[0].title);
            if (category[0])
                self.selectedCategory(category[0]);

        });

        //Enable this route for production
//        this.get('', function() {
//            console.log("In the root url ");
//            if (self.selectedCategory()) {
//                self.selectedCategory(null);
//            }
//        });

        this.get('', function() { this.app.runRoute('get', '#car-loans') });

    }).run();
}


//function CarLoanWizard() {
//    var self = this;
//}

ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function(element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
};

$(function() {
    console.log("About to load bindings");
    ko.applyBindings(new App());
});





