describe('template spec', () => {
  beforeEach('load fixture', function() {
    cy.fixture('mortgage.json').as('mortgageData')
  })
  it('Get Mortage Calculation', function () {
    const mortgageIn = this.mortgageData.request
    const baseUrl = `https://www.calculator.net/mortgage-calculator.html?chouseprice=${mortgageIn.chouseprice}&cdownpayment=${mortgageIn.cdownpayment}&cdownpaymentunit=${mortgageIn.cdownpaymentunit}&cloanterm=${mortgageIn.cloanterm}&cinterestrate=${mortgageIn.cinterestrate}&cstartmonth=${mortgageIn.cstartmonth}&cstartyear=${mortgageIn.cstartyear}&caddoptional=${mortgageIn.caddoptional}&cpropertytaxes=${mortgageIn.cpropertytaxes}&cpropertytaxesunit=${mortgageIn.cpropertytaxesunit}&chomeins=${mortgageIn.chomeins}&chomeinsunit=${mortgageIn.chomeinsunit}&cpmi=${mortgageIn.cpmi}&cpmiunit=${mortgageIn.cpmiunit}&choa=${mortgageIn.choa}&choaunit=${mortgageIn.choaunit}&cothercost=${mortgageIn.cothercost}&cothercostunit=${mortgageIn.cothercostunit}&cmop=${mortgageIn.cmop}&cptinc=${mortgageIn.cptinc}&chiinc=${mortgageIn.chiinc}&choainc=${mortgageIn.choainc}&cocinc=${mortgageIn.cocinc}&cexma=${mortgageIn.cexma}&cexmsm=${mortgageIn.cexmsm}&cexmsy=${mortgageIn.cexmsy}&cexya=${mortgageIn.cexya}&cexysm=${mortgageIn.cexysm}&cexysy=${mortgageIn.cexysy}&cexoa=${mortgageIn.cexoa}&cexosm=${mortgageIn.cexosm}&cexosy=${mortgageIn.cexosy}&caot=${mortgageIn.caot}&xa1=${mortgageIn.xa1}&xm1=${mortgageIn.xm1}&xy1=${mortgageIn.xy1}&xa2=${mortgageIn.xa2}&xm2=${mortgageIn.xm2}&xy2=${mortgageIn.xy2}&xa3=${mortgageIn.xa3}&xm3=${mortgageIn.xm3}&xy3=${mortgageIn.xy3}&xa4=${mortgageIn.xa4}&xm4=${mortgageIn.xm4}&xy4=${mortgageIn.xy4}&xa5=${mortgageIn.xa5}&xm5=${mortgageIn.xm5}&xy5=${mortgageIn.xy5}&xa6=${mortgageIn.xa6}&xm6=${mortgageIn.xm6}&xy6=${mortgageIn.xy6}&xa7=${mortgageIn.xa7}&xm7=${mortgageIn.xm7}&xy7=${mortgageIn.xy7}&xa8=${mortgageIn.xa8}&xm8=${mortgageIn.xm8}&xy8=${mortgageIn.xy8}&xa9=${mortgageIn.xa9}&xm9=${mortgageIn.xm9}&xy9=${mortgageIn.xy9}&xa10=${mortgageIn.xa10}&xm10=${mortgageIn.xm10}&xy10=${mortgageIn.xy10}&csbw=${mortgageIn.csbw}&printit=${mortgageIn.printit}&x=${mortgageIn.x}`;
    // This app is not set up well for automated testing. There should dedicated attributes that are isolated from general changes. I will be using ids for now, but I would suggest adding data attributes to the elements that are not likely to change.
    cy.visit(baseUrl)
    const mortgageOut = this.mortgageData.response
    // these nested tables are a little nasty without the proper data attributes. I will be using some brittle selectors here for the sake of convenience
    cy.get(':nth-child(2) > :nth-child(2) > b').should('have.text', mortgageOut.MortgagePaymentMonthly)
    cy.get(':nth-child(2) > :nth-child(3) > b').should('have.text', mortgageOut.MortgagePaymentTotal)
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > table > tbody > :nth-child(3) > :nth-child(2)').should('have.text', mortgageOut.PropertyTaxMonthly)
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > table > tbody > :nth-child(3) > :nth-child(3)').should('have.text', mortgageOut.PropertyTaxTotal)
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > table > tbody > :nth-child(4) > :nth-child(2)').should('have.text', mortgageOut.HomeInsuranceMonthly)
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > table > tbody > :nth-child(4) > :nth-child(3)').should('have.text', mortgageOut.HomeInsuranceTotal)
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > table > tbody > :nth-child(5) > :nth-child(2)').should('have.text', mortgageOut.OtherCostsMonthly)
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > table > tbody > :nth-child(5) > :nth-child(3)').should('have.text', mortgageOut.OtherCostsTotal)
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > table > tbody > :nth-child(6) > :nth-child(2)').should('have.text', mortgageOut.OutOfPocketMonthly)
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > table > tbody > :nth-child(6) > :nth-child(3)').should('have.text', mortgageOut.OutOfPocketTotal)
    cy.get(':nth-child(8) > [align="right"]').should('have.text', mortgageOut.HousePrice)
    cy.get(':nth-child(9) > [align="right"]').should('have.text', mortgageOut.LoanAmount)
    cy.get(':nth-child(10) > [align="right"]').should('have.text', mortgageOut.DownPayment)
    cy.get(':nth-child(11) > [align="right"]').should('have.text', mortgageOut.TotalMortgagePayments)
    cy.get(':nth-child(12) > [align="right"]').should('have.text', mortgageOut.TotalInterest)

    cy.get('svg').each((el) => {
      // implementing this is beyond the scope of this exercise, but you can use python or ai to determine if images are identical
      cy.get(el).screenshot()
    })
  })
})