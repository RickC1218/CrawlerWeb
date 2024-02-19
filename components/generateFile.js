const XLSX = require("xlsx");
const { printReports, sortByComments, sortByPoints } = require("./reports.js");

// Write elements to Excel
function writeToExcel(data, filename) {
  const wb = XLSX.utils.book_new();

  const ws = XLSX.utils.json_to_sheet(data);

  const commentsSheet = XLSX.utils.json_to_sheet(sortByComments(data));
  
  const pointsSheet = XLSX.utils.json_to_sheet(sortByPoints(data));

  XLSX.utils.book_append_sheet(wb, ws, "Data");
  
  XLSX.utils.book_append_sheet(wb, commentsSheet, "Comments");
  XLSX.utils.book_append_sheet(wb, pointsSheet, "Points");

  XLSX.writeFile(wb, `${filename}.xlsx`);
}

// Print and write to Excel
function sendReports(data, filename) {
  // Print to console
  printReports(data);
  // Write to Excel
  writeToExcel(data, filename);
}

module.exports = {
  sortByComments,
  sortByPoints,
  sendReports,
};
