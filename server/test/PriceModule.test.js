const PriceModule = require("../modules/PriceModule");

describe("Checking fuel price calculation", () => {

    test("In-state, has history, high volume", () => {
        const quote = new PriceModule("TX", true, 220);
        let price = quote.getQuote()
        expect(price).toEqual(376.20);

    });

    test("Out-state, no history, low volume", () => {
        const quote = new PriceModule("CA", false, 500);
        let price = quote.getQuote()
        expect(price).toEqual(880);
    });

    test("In-state, no history, high volume, price with decimal", () => {
        const quote = new PriceModule("TX", false, 2999);
        let price = quote.getQuote()
        expect(price).toEqual(5128.29);

    });

})