const { JSDOM } = require("jsdom");

async function crawl(currentURL) {
  try {
    // Fetch the page
    const resp = await fetch(currentURL);
    const contentType = resp.headers.get("content-type");

    if (contentType && contentType.includes("text/html")) {
      // get the HTML
      const html = await resp.text();
      return getData(html);
    } else {
      console.log(`Skipping ${currentURL} because it's not HTML`);
      return {};
    }
  } catch (error) {
    console.log(`Error fetching ${currentURL}: ${error.message}`);
  }
}

// Get data from a page
function getData(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const elements = document.querySelectorAll(`tbody > .athing`);

  const data = [];

  elements.forEach((element) => {
    id = element.getAttribute("id");

    //find the id of the elements
    const index = document.getElementById(id);
    const rank = index.querySelector(`.title > .rank`)
      ? index.querySelector(`.title > .rank`).textContent
      : "0.";
    const title = index.querySelector(`.title > .titleline > a`)
      ? index.querySelector(`.title > .titleline > a`).textContent
      : "No title";

    const points = document.getElementById(`score_${id}`)
      ? document.getElementById(`score_${id}`).textContent
      : "0 points";

    const comments = document.querySelector(
      `.subtext > .subline > a[href = "item?id=${id}" ]`
    )
      ? document.querySelector(
          ` .subtext > .subline > a[href = "item?id=${id}"]`
        ).textContent
      : "0 comments";

    data.push({
      rank: rank,
      title: title,
      points: points,
      comments: comments,
    });
  });

  return data;
}

module.exports = {
  crawl,
  getData,
};
