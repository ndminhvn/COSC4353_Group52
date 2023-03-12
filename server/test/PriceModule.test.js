const PriceModule = require("../modules/PriceModule");

describe("Checking fuel price calculation", () => {

    test("In-state, has history, high volume", () => {
        const quote = new PriceModule("TX", true, 3000);
        let price = quote.getQuote()
        expect(price).toEqual(5100);

    });

    test("Out-state, no history, low volume", () => {
        const quote = new PriceModule("CA", false, 500);
        let price = quote.getQuote()
        expect(price).toEqual(880);
    });

})