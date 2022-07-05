const util = require('util');
const puppeteer = require('puppeteer');
const axe = require('axe-core');

const urls = [
  'https://engineering.cerner.com/terra-ui/#/home/terra-ui/index',
  'https://engineering.cerner.com/terra-ui/#/getting-started/terra-ui/what-is-terra',
];

const results = [];
let axeResults;
puppeteer.launch().then(async browser => {
  const promises = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    promises.push(browser.newPage().then(async page => {
      await page.goto(`${url}`);

      // add axe-core to the pages
      await page.addScriptTag({
        path: require.resolve('axe-core')
      });

      // run axe on the page
      axeResults = await page.evaluate(async () => {
        return await axe.run();
      });

      // remove result data we don't need
      delete axeResults.passes;
      delete axeResults.inapplicable;
      delete axeResults.incomplete;

      // add results to the collection of axe results
      results.push(axeResults);
    }))
  }
  await Promise.all(promises)
  browser.close();

  console.log(util.inspect(results, false, null, true))
});


/*
https://gist.githubusercontent.com/bjankord/c8afaf345b4499ca3b1267063ce48562/raw/908bd4da648540a2b74343e0b3047b6d30603129/index.js
https://marmelab.com/blog/2018/07/18/accessibility-performance-testing-puppeteer.html
https://github.com/dequelabs/axe-core-npm/blob/develop/packages/puppeteer/src/axePuppeteer.ts
https://github.com/dequelabs/axe-puppeteer/blob/develop/src/axePuppeteer.ts
*/