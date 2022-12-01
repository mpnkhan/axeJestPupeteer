let runAxe = require( '../actions/runAxe' );
let saveJson = require( '../actions/saveJson' );

jest.setTimeout(60000)

describe('Basic authentication e2e tests', () => {
  beforeAll( async () => {
    await page.setBypassCSP(true);  //very important
    await page.setViewport( {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    } );

  }); //beforeAll

  it( 'PayPal Signup Flow', async () => {

     const navigationPromise = page.waitForNavigation();
      await page.goto('https://www.paypal.com/us/home');    //,{waitUntil: 'networkidle2'});
      await page.waitForSelector('#signup-button')
      let results = await runAxe(page).evalPage();
      // console.log('results1', results)
      await page.screenshot({path: 'home.png'});
      if(results && results.length>0){
        saveJson.addModifyrunDetails('paypal','homepage', results);
      }

      await page.click('#signup-button')
      await navigationPromise;
      // await page.waitForSelector('.account-selection-cards-inner-container-radio')
      results =  await runAxe(page).evalPage();
      // console.log('results2', results)
      await page.screenshot({path: 'account_selection.png'});
      if(results && results.length>0){
        saveJson.addModifyrunDetails('paypal','account_selection', results);
      }
    
    return true
  } );

   it( 'Should be truthy', async () => {
    expect( true ).toBeTruthy();
  }) 

});