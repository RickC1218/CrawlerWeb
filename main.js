const { crawl } = require("./components/crawl.js");
const { printReports } = require("./components/reports.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1); // exit with error
  }
  if (process.argv.length > 3) {
    console.log("too many arguments");
    process.exit(1); // exit with error
  }

  const baseURL = process.argv[2];

  const items = await crawl(baseURL);

  printReports(items);
}

main();
