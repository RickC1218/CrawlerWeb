const { JSDOM } = require('jsdom');

// Normalize URL
function normalizeUrl(url) {
  const urlObject = new URL(url);
  const hostPath = urlObject.host + urlObject.pathname;
  if (hostPath.endsWith('/')) {
    return hostPath.substring(0, hostPath.length - 1);
  }
  return hostPath;
}

// Get urls from a page
function getURLs(url, html) {
  const urls = [];
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      // If the href is a relative path, we need to convert it to an absolute path
      if (href.startsWith('/')) {
        try {
          const urlObject = new URL(url);
          const absolutePath = urlObject.protocol + '//' + urlObject.host + href;
          urls.push(normalizeUrl(absolutePath));
          return;
        } catch (error) {
          console.log('Error parsing relative URL', error.message);
        }
      }
      // If the href is an absolute path, we need to normalize it
      try {
        const urlObject = new URL(href);
        const normalizedUrl = normalizeUrl(urlObject);
        urls.push(normalizedUrl);
      } catch (error) {
        console.log(`Error parsing absolute URL ${error.JSDOM}`, error.message);
      }
    }
  });
  return urls;
}

module.exports = {
  normalizeUrl,
  getURLs
};