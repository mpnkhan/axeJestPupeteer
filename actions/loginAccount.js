class LoginAccount {
  constructor( page ) {
    this.url = "https://www.paypal.com/signin/"
    this.page = page;
    this.usernameField = '#email';
    this.nextBtn = '#btnNext';
    this.passwordField = '#password';
    this.loginPageBtn = '#btnLogin';
  }

  async login (username, password) {
    try {
        await page.goto(this.url, {
        waitUntil: 'networkidle2',
    });      

      await this.page.type( this.usernameField, username );
      await this.page.waitForTimeout( 1000 );

      await this.page.click( this.nextBtn );
      await page.waitForNavigation({waitUntil: 'domcontentloaded'});

      // await this.page.type( this.passwordField, 'abcdefgh');
      // await this.page.type( this.passwordField, password);
      await page.type('input[type="password"]', 'abcdefgh');
      await this.page.waitForTimeout( 1000 );

      await this.page.click( this.loginPageBtn );
      await page.waitForNavigation({waitUntil: 'domcontentloaded'});
 
    } catch ( err ) {
      console.log( err );
    }
  }
}

module.exports = ( page ) => new LoginAccount( page );
