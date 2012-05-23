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

var BasicView = JS.Class({

    construct: function(title, icon, type, data) {
        this.title = title;
        this.icon = icon;
        this.type = type;
        this.template = "credit-cards";
        this.items = data;
    }
});

var CreditCardView = BasicView.extend({
    construct: function() {
        this.icon = "/images/creditcards.png";
        this.title = "Credit Cards";
        this.type = ComparableCategoryType.CREDIT_CARDS;
        this.template = ComparableCategoryType.CREDIT_CARDS;
        this.items = [
            { id: 1, name: "AMEX"},
            { id: 2, name: "VISA"},
            { id: 3, name: "MASTERCARD"}
        ];
        console.log("Constructed view " + this.type);
   }
});

var CarLoanView = BasicView.extend({
   construct: function() {
       var self = this;
       self.icon = "/images/carloans.png";
       self.type = ComparableCategoryType.CAR_LOANS;
       self.template = ComparableCategoryType.CAR_LOANS;
       self.title = "Car Loans";
       self.items = ko.observableArray([
            { id: 1, name: "Barclays Unsecured Loan", company: "Barclays"},
            { id: 2, name: "Standard Chartered Car Loan", company: "Standard Chartered"},
            { id: 3, name: "Equity Personal Loan", company: "Equity"}
       ]);

       self.loanAmount = ko.observable();

       self.prepareView = function(viewItems) {
           self.loanAmountSlider = $( "#loanAmountSlider" ).slider({
               value: 1000000,
               min: 500000,
               max: 10000000,
               step: 100000,
               slide: function(event, ui) {
                   self.loanAmount(ui.value);
               }
           });

       }
   }
});

//var Card = JS.Class({
//    construct: function(data) {
//        this.name = data.name;
//        this.limit = data.limit;
//        this.interestFreeDays = data.interestFreeDays;
//        this.annualFee = data.annualFee;
//        this.provider = data.provider;
//    },
//
//    compareTo: function(other) {
//    }
//});
