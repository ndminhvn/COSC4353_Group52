class PriceModule {
  constructor(state, hasHistory, gallonsRequested) {
    // 2% for Texas, 4% for out-of-state
    this.locationFactor = "TX" === state ? 0.02 : 0.04;
    // 1% if the client requested fuel before, 0% if no history
    this.historyFactor = hasHistory ? 0.01 : 0.0;
    // 2% if more than 1000 Gallons, 3% if less
    this.amountFactor = gallonsRequested >= 1000 ? 0.02 : 0.03;
    // 10% always
    this.profitFactor = 0.1;
    // $1.50 always
    this.crudePrice = 1.5;
    // amount requested
    this.gallonsRequested = gallonsRequested;
  }

  rounded(num) {
    return Number((Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2));
  }

  getQuote() {
    let unitCost = this.getUnitCost();
    let price = this.rounded(unitCost * this.gallonsRequested);
    return price;
  }

  getUnitCost() {
    this.margin =
      this.crudePrice *
      (this.locationFactor -
        this.historyFactor +
        this.amountFactor +
        this.profitFactor);
    let unitCost = this.rounded(this.crudePrice + this.margin);
    return unitCost;
  }
}

module.exports = PriceModule;