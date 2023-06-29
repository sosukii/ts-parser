import puppeteer from 'puppeteer';
import 'dotenv/config'

let shouldVisitArchive = true
const isArchiveLink = link =>  link === <string>process.env.SUPPLIER_LINK

async function returnLinksOnCategories(page, categorySelector: String): Promise<string[]> {
  return await page.$$eval(categorySelector, links =>
    links.map( link => link.href)
  )
}

async function parse() {
  const browser = await puppeteer.launch({ headless:false, args: ["--disable-setuid-sandbox"], 'ignoreHTTPSErrors': true });
  const page = await browser.newPage();
  await page.goto(<string>process.env.SUPPLIER_LINK);

  await page.waitForSelector(<string>process.env.CATEGORY_NODE);

  const links = await returnLinksOnCategories(page, <string>process.env.CATEGORY_NODE)
  links.forEach(async link => {
    if(isArchiveLink(link) && shouldVisitArchive) {
      shouldVisitArchive = false
      // visit link

    }
    // const secondPage = await browser.newPage()
    // secondPage.goto(link)
  })

  // await browser.close();
}
parse()