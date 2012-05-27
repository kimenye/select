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
        self.typeProperty = data.typeProperty;
        self.selected = ko.observable(data.selected || false);
        self.belongsTo = data.belongsTo;
    },
    is_valid_for: function(loan) {

        if (this.selected()) {
            return loan[this.typeProperty];
        }

        return true;
    }
});

var CarLoan = JS.Class({
    construct: function(data) {
        var self = this;
        self.data = _.extend(data,
            {
                selected: ko.observable(data.selected != null? data.selected : false),
                rateType: ko.computed(function() {
                   return data.fixed ? "Fixed" : "Variable";
                }),
                amount: ko.computed(function() {
                    return Currency("", data.maxAmount);
                })
            });

        self.action = ko.computed(function() {
            return self.data.selected() ? "Remove" : "Add"
        })

        self.isAdd = ko.computed(function() {
            return self.action() == "Add"
        })

        self.isRemove = ko.computed(function() {
            return self.action() == "Remove"
        })

        self.act = function() {
            self.data.selected(!self.data.selected());
        }
    },

    validate_types : function(types) {
        var passed = true;
        var loan = this.data;
        _.each(types, function(type) {
            passed = type.is_valid_for(loan);
        });
        return passed;
    }

});


var CarLoanView = BasicView.extend({
   construct: function() {
       var self = this;
       self.icon = "/images/carloans.png";
       self.type = ComparableCategoryType.CAR_LOANS;
       self.template = ComparableCategoryType.CAR_LOANS;
       self.title = "Car Loans";
       self.page = ko.observable(0);

       self.loanTypes = ko.observableArray([
           new LoanType({ id: "1",title: "Fixed Interest", selected: false, typeProperty: "fixed", belongsTo: self}),
           new LoanType({ id: "1",title: "Variable Interest", typeProperty: "variable", belongsTo: self }),
           new LoanType({ id: "1",title: "Secured", typeProperty: "secured", belongsTo: self }),
           new LoanType({ id: "1",title: "Unsecured",typeProperty: "unsecured", belongsTo: self })
       ]);

       self.loanAmount = ko.observable(1000000);
       self.loanTerm = ko.observable(1);
       self.monthlyBudget = ko.observable(0);

       self.next = function() {
           self.page(self.page() + 1);
       }

       self.back = function() {
           self.page(self.page() - 1);
       }

       self.canAdd = function() {
           return self.selectedItems().length < 3;
       }

       self.rawItems = [
               new CarLoan({ id: 1, name: "Barclays Unsecured Loan", company: "Barclays", fixed: true, maxAmount: 1000000, unsecured: true, maxLoanTerm: 5, selected: true}),
               new CarLoan({ id: 2, name: "Standard Chartered Car Loan", company: "Standard Chartered", fixed: true, unsecured: true, maxAmount: 7000000, maxLoanTerm: 10, selected: true}),
               new CarLoan({ id: 3, name: "Equity Personal Loan", company: "Equity", variable: true, unsecured: true, maxAmount: 3000000, maxLoanTerm: 20}),
               new CarLoan({ id: 4, name: "Family Bank Car Loan", company: "Family Bank", variable: true, maxAmount: 10000000, unsecured: true, maxLoanTerm: 2}),
               new CarLoan({ id: 5, name: "Family Bank Secured Personal Loan", company: "Family Bank", variable: true, secured: true, maxAmount: 10000000, maxLoanTerm: 2})
           ];


       self.items = ko.computed(function() {

           var selected_loan_types = _.filter(self.loanTypes(), function(type) {
               return type.selected();
           });

           console.log("Refreshing selected items ", self.rawItems.length);

           return _.filter(self.rawItems, function(loan) {
               return (
                   loan.data.maxAmount >= self.loanAmount() &&
                   loan.data.maxLoanTerm >= self.loanTerm() &&
                   !loan.data.selected() &&
                   loan.validate_types(selected_loan_types)
               )
           });

       });

       self.selectedItems = ko.computed(function() {
          return _.filter(self.rawItems, function(item) {
            return (
                item.data.selected()
            )
          });
       });



       self.loanAmountDisplay = ko.computed(function() {
          return Currency("Ksh", self.loanAmount())
       });

       self.prepareView = function(viewItems) {
           self.loanAmountSlider = $("#loanAmountSlider").slider({
               value:self.loanAmount(),
               min:500000,
               max:10000000,
               step:500000,
               slide:function (event, ui) {
                   self.loanAmount(ui.value);
               }
           });

           self.loanTermSlider = $("#loanTermSlider").slider({
               value:self.loanTerm(),
               min:1,
               max:10,
               step:1,
               slide:function (event, ui) {
                   self.loanTerm(ui.value);
               }
           });

       }
   }
});

function Currency(symbol, value) {
    digits = value.toFixed(2).split(".");
    digits[0] = digits[0].split("").reverse().join("").replace(/(\d{3})(?=\d)/g, "$1,").split("").reverse().join("");
    return symbol + " " + digits.join(".");
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
