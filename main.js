function main(){
  if (process.argv.length < 3){
    console.log("no website provided");
    process.exit(1); // exit with error
  }
  if (process.argv.length > 3){
    console.log("too many arguments");
    process.exit(1); // exit with error
  }

  console.log(`Starting main.js with ${process.argv[2]}`);
}

main();