// titles with more than five words and ordered by the number of comments first
function sortByComments(data) {
  // filter by title
  filterData = data.filter((item) => item.title.split(" ").length > 5);

  filterData.sort((a, b) => {
    // sort by comments
    const aComments = parseInt(a.comments.split(" ")[0]);
    const bComments = parseInt(b.comments.split(" ")[0]);
    return bComments - aComments;
  });

  return filterData;
}

// titles with less than or equal to five words and ordered by the points first
function sortByPoints(data) {
  // filter by title
  filterData = data.filter((item) => item.title.split(" ").length <= 5);

  filterData.sort((a, b) => {
    const aPoints = parseInt(a.points.split(" ")[0]);
    const bPoints = parseInt(b.points.split(" ")[0]);
    return bPoints - aPoints;
  });

  return filterData;
}

function printReports(data) {
  const comments = sortByComments(data);
  const points = sortByPoints(data);

  console.log("Filter 1");
  comments.forEach((item) => {
    console.log(item);
  });

  console.log("Filter 2");
  points.forEach((item) => {
    console.log(item);
  });
}

module.exports = {
  sortByComments,
  sortByPoints,
  printReports,
};
