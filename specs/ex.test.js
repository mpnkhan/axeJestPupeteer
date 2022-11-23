let runAxe = require( '../actions/runAxe' );

jest.setTimeout(60000)

jest.setTimeout(60000)

describe('Basic authentication e2e tests', () => {
  beforeAll( async () => {
    await page.setBypassCSP(true);  //very important
    await page.setViewport( {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    } );


    await page.goto('https://www.paypal.com/us/home', {
    // await page.goto('https://www.google.com', {
      waitUntil: 'domcontentloaded',
    });
      runAxe = await runAxe( page );

    } );

  it( 'Should be able to eval with axe in', async () => {
    const results = await runAxe.evalPage();
    console.log(results)
    await page.screenshot({path: 'example.png'});
    return true
  } );

   it( 'Should be truthy', async () => {
    expect( true ).toBeTruthy();
  }) 

});