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
        this.data = data;
    }
});

var CreditCardView = BasicView.extend({
    construct: function() {
        this.icon = "/images/creditcards.png";
        this.title = "Credit Cards";
        this.type = ComparableCategoryType.CREDIT_CARDS;
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
       this.icon = "/images/carloans.png";
       this.type = ComparableCategoryType.CAR_LOANS;
       this.title = "Car Loans";
       this.items = [
            { id: 1, name: "ANZ Car Loan"},
            { id: 2, name: "Commonwealth Car Loan"},
            { id: 3, name: "NAB Car Loan"}
       ];
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
