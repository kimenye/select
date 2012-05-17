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

