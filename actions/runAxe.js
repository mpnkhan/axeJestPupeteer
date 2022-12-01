class runAxe {
  constructor( page ) {
    this.page = page;
    let jsonOp = {}

  }

  async evalPage (options) {
    try {
      let {...axeOptions} = options || {};
      // comsole.log(axeOptions)
      const includedImpacts = ['critical', 'serious'];
      await this.page.addScriptTag({path: require.resolve('axe-core')})
      const accessibilityReport = await this.page.evaluate(axeOptions => {
        return new Promise(resolve => {
          setTimeout(resolve, 0);
        })
        .then(() => window.axe.run(axeOptions))
        .then(({ violations }) => {
          return violations;

         })
      }, options);

       return accessibilityReport.filter(function (el) {
                  return includedImpacts && includedImpacts.includes(el.impact)
        });          
    } catch ( err ) {
      console.log( err );
    }
  } //evalPage

} //endClass

module.exports = ( page ) => new runAxe( page );
