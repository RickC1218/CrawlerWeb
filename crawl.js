const { JSDOM } = require('jsdom');

async function crawl(baseURL, currentURL, pages) {

  const baseURLObject = new URL(baseURL);
  const currentURLObject = new URL(currentURL);
  console.log("Crawling", currentURL);
  if (baseURLObject.hostname !== currentURLObject.hostname) {
    console.log(`Skipping ${currentURL} because it's not the same domain`);
    return pages;
  }

  try {
    const resp = await fetch(currentURL);
    const contentType = resp.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      const html = await resp.text();
      const data = getData(html);
      console.log(`Found ${data.length} links on ${currentURL}`);
    } else {
      console.log(`Skipping ${currentURL} because it's not HTML`);
    }
    return pages;

  } catch (error) {
    console.log(`Error fetching ${currentURL}: ${error.message}`);
  }
}

// Get urls from a page
function getData(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const firstElements = document.querySelectorAll(`tbody > .athing`);
  const commentElements = document.querySelectorAll(`tbody > .subtext > subline`);

  const data = [];
  const ids = [];

  firstElements.forEach(element => {
    id = element.getAttribute('id');

    //find the id of the element
    const index = document.getElementById(id);
    const rank = index.querySelector(`.title > .rank`) ? index.querySelector(`.title > .rank`).textContent : "0.";
    const title = index.querySelector(`.title > .titleline > a`) ? index.querySelector(`.title > .titleline > a`).textContent : "No title";

    const points = document.getElementById(`score_${id}`) ? document.getElementById(`score_${id}`).textContent : "0 points";

    const comments = document.querySelector(`.subtext > .subline > a[href = "item?id=${id}" ]`) ? document.querySelector(` .subtext > .subline > a[href = "item?id=${id}"]`).textContent : "0 comments";

    data.push({ id: id, rank: rank, title: title, points: points, comments: comments});
  });
  console.log(data);
  return data;
}

module.exports = {
  crawl,
  getData
};