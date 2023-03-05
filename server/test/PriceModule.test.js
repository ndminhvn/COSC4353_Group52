const PriceModule = require("../modules/PriceModule");

describe("Price Module", () => {

    test("In-state, has history, high volume", () => {
        const quote = new PriceModule("TX", true, 3000);
        let price = quote.getQuote()
        expect(price).toEqual(5085);
    });

    test.todo("out-state, no history, high volume");

    test.todo("Out-state, has history, low volume");

})