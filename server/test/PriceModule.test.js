const PriceModule = require("../modules/PriceModule");

describe("Pricing module", () => {

    describe("Calculating quote prices", () => {

        test("In-state, has history, volume < 1000", () => {
            const quote = new PriceModule("TX", true, 220);
            let price = quote.getQuote()
            expect(price).toEqual(376.20);
        });

        test("Out-state, no history, volume < 1000", () => {
            const quote = new PriceModule("CA", false, 500);
            let price = quote.getQuote()
            expect(price).toEqual(880);
        });

        test("In-state, no history, volume >= 1000", () => {
            const quote = new PriceModule("TX", false, 3000);
            let price = quote.getQuote()
            expect(price).toEqual(5130);
        });

    })

    describe("Rounding to 2 decimals place", () => {

        test("Try rounding 1.789", () => {
            const quote = new PriceModule("CA", true, 200);
            let num = quote.rounded(1.789)
            expect(num).toEqual(1.79);
        });

        test("Try rounding 1.1", () => {
            const quote = new PriceModule("CA", true, 200);
            let num = quote.rounded(1.1)
            expect(num).toEqual(1.10);
        });

    })

    

   

})