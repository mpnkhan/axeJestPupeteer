class runAxe {
  constructor( page ) {
    this.page = page;
    let jsonOp = {}

  }

  async evalPage (options) {
    try {
      let {...axeOptions} = options || {}
      await this.page.addScriptTag({path: require.resolve('axe-core')})

/*
      const results = await this.page.evaluate((axeOptions) => {
         return window.axe.run(window.document, axeOptions);
         // return window.document.title
      }, axeOptions);


*/

      const accessibilityReport = await this.page.evaluate(axeOptions => {
        return new Promise(resolve => {
          setTimeout(resolve, 0);
        }).then(() => window.axe.run(axeOptions));
      }, options);
      return accessibilityReport;

    } catch ( err ) {
      console.log( err );
    }
  }
}

module.exports = ( page ) => new runAxe( page );
