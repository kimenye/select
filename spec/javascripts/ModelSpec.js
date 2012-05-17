describe("Comparators", function() {

    it('should increment a variable', function () {
        var foo = 0;            // set up the world
        foo++;                  // call your application code
        expect(foo).toEqual(1); // passes because foo == 1
    });

    it("should return the credit card with the higher limit", function() {

        var anzAmex = new Card("VISA Platinum", 20000.00, new Provider("ANZ"));
        var commVisa = new Card("VISA Normal", 10000.00, new Provider("COMM"))
    })

});