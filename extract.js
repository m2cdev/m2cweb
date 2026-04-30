const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head></head>
      <body>
        <script charset="utf-8" type="text/javascript" src="https://js-na2.hsforms.net/forms/embed/v2.js"></script>
        <script>
          hbspt.forms.create({
            region: "na2",
            portalId: "241945630",
            formId: "228c833e-9348-4473-9c53-2e4aa96ed032"
          });
        </script>
      </body>
    </html>
  `);
  
  // Wait for the iframe
  await page.waitForSelector('iframe.hs-form-iframe');
  
  const elementHandle = await page.$('iframe.hs-form-iframe');
  const frame = await elementHandle.contentFrame();
  
  // Wait for the form to render inside the iframe
  await frame.waitForSelector('form');
  
  const fields = await frame.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
    return inputs.map(i => {
      let options = null;
      if (i.tagName === 'SELECT') {
        options = Array.from(i.querySelectorAll('option')).map(o => o.value);
      }
      return {
        name: i.name,
        type: i.tagName,
        options: options
      };
    }).filter(n => n.name && !n.name.includes('hs_context'));
  });
  
  console.log("FIELDS:", JSON.stringify(fields, null, 2));
  await browser.close();
})();
