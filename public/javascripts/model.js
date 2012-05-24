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
        this.prepareView = function(items) {
            console.log("Does nothing for now");
        }
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
        this.prepareView = function(items) {
            console.log("Does nothing for now");
        }
   }
});

var LoanType = JS.Class({
    construct: function(data) {
        var self = this;
        self.id = data.id;
        self.title = data.title;
        self.selected = ko.observable(data.selected || false);
        self.belongsTo = data.belongsTo;

        self.selected.subscribe(function(newValue) {
           console.log("Modified " + self.title);
//            self.belongsTo.filteredItems(self);
        });
    }
})


var CarLoanView = BasicView.extend({
   construct: function() {
       var self = this;
       self.icon = "/images/carloans.png";
       self.type = ComparableCategoryType.CAR_LOANS;
       self.template = ComparableCategoryType.CAR_LOANS;
       self.title = "Car Loans";

       self.items = ko.observableArray([
            { id: 1, name: "Barclays Unsecured Loan", company: "Barclays", fixed: true},
            { id: 2, name: "Standard Chartered Car Loan", company: "Standard Chartered", fixed: true},
            { id: 3, name: "Equity Personal Loan", company: "Equity"}
       ]);

       self.loanTypes = ko.observableArray([
           new LoanType({ id: "1",title: "Fixed Interest", selected: true, belongsTo: this}),
           new LoanType({ id: "1",title: "Variable Interest", belongsTo: this }),
           new LoanType({ id: "1",title: "Secured", belongsTo: this }),
           new LoanType({ id: "1",title: "Unsecured", belongsTo: this })
       ]);

       self.loanAmount = ko.observable(1000000);
       self.loanTerm = ko.observable(1);

       self.loanAmountDisplay = ko.computed(function() {
          return Currency("Ksh", self.loanAmount())
       });

       self.prepareView = function(viewItems) {
           self.loanAmountSlider = $("#loanAmountSlider").slider({
               value:1000000,
               min:500000,
               max:10000000,
               step:100000,
               slide:function (event, ui) {
                   self.loanAmount(ui.value);
               }
           });

           self.loanTermSlider = $("#loanTermSlider").slider({
               value:5,
               min:1,
               max:20,
               step:1,
               slide:function (event, ui) {
                   self.loanTerm(ui.value);
               }
           });

       }
   }
});

function Currency(sSymbol, vValue) {
    aDigits = vValue.toFixed(2).split(".");
    aDigits[0] = aDigits[0].split("").reverse().join("").replace(/(\d{3})(?=\d)/g, "$1,").split("").reverse().join("");
    return sSymbol + " " + aDigits.join(".");
}


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
