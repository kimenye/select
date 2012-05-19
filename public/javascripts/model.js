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

var Provider = JS.Class({

    construct: function(name) {
        this.name = name;
    }
});

var Card = JS.Class({
    construct: function(data) {
        this.name = data.name;
        this.limit = data.limit;
        this.interestFreeDays = data.interestFreeDays;
        this.annualFee = data.annualFee;
        this.provider = data.provider;
    },

    compareTo: function(other) {
    }
});

var NumericComparator = function(val, other) {
  return (val - other);
}

