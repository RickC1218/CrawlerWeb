const { crawl } = require('./crawl.js');

async function main(){
  if (process.argv.length < 3){
    console.log("no website provided");
    process.exit(1); // exit with error
  }
  if (process.argv.length > 3){
    console.log("too many arguments");
    process.exit(1); // exit with error
  }

  const baseURL = process.argv[2];

  const pages = crawl(baseURL, baseURL, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();