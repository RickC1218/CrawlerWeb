const { crawl } = require("./components/crawl.js");
const { printReports } = require("./components/reports.js");
const { sendReports } = require("./components/generateFile.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1); // exit with error
  }

  const baseURL = process.argv[2];
  const items = await crawl(baseURL);
  console.log("Obtain data", items);
  printReports(items);

  if (process.argv.length > 3) {
    if (process.argv.length === 4) {
      const filename = process.argv[3];
      sendReports(items, filename);
    } else {
      console.log("too many arguments");
      process.exit(1); // exit with error
    }
  }
}

main();
