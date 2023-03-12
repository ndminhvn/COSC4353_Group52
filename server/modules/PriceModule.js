class PriceModule {

    constructor(state, hasHistory, gallonsRequested){

        // 2% for Texas, 4% for out-of-state
        this.locationFactor = 'TX' === state ? 0.02 : 0.04;
        // 1% if the client requested fuel before, 0% if no history
        this.historyFactor = hasHistory ? 0.01 : 0.0;
        // 2% if more than 1000 Gallons, 3% if less
        this.amountFactor = gallonsRequested >= 1000 ? 0.02 : 0.03
        // 10% always
        this.profitFactor = 0.1;
        // $1.50 always
        this.crudePrice = 1.50;
        // amount requested
        this.gallonsRequested = gallonsRequested;
    }

    getQuote(){

        let unitCost = this.getUnitCost();
        let price = unitCost * this.gallonsRequested;
        return price;

    }

    getUnitCost(){

        this.margin = this.crudePrice *
        ( 
            this.locationFactor 
            - this.historyFactor 
            + this.amountFactor 
            + this.profitFactor
        )

        let unitCost = this.crudePrice + this.margin;
        unitCost = Math.round(( unitCost + Number.EPSILON) * 100) / 100;
        return unitCost;

    }
}

module.exports = PriceModule;