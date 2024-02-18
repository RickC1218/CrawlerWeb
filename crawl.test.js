const { normalizeUrl, getURLs } = require('./crawl');
const { test, expect } = require('@jest/globals');

// Test 1 - normalizeUrl of protocol
test('normalizeUrl of protocol', () => {
  const input = 'https://github.com/RickC1218/WebCrawler';
  const actual = normalizeUrl(input);
  const expected = 'github.com/RickC1218/WebCrawler';
  expect(actual).toEqual(expected);
});

// Test 2 - normalizeUrl of slash ending "/"
test('normalizeUrl of slash ending "/"', () => {
  const input = 'https://github.com/RickC1218/WebCrawler/';
  const actual = normalizeUrl(input);
  const expected = 'github.com/RickC1218/WebCrawler';
  expect(actual).toEqual(expected);
});

// Test 3 - normalizeUrl of protocol http
test('normalizeUrl of protocol http', () => {
  const input = 'http://github.com/RickC1218/WebCrawler/';
  const actual = normalizeUrl(input);
  const expected = 'github.com/RickC1218/WebCrawler';
  expect(actual).toEqual(expected);
});


// Test 4 - getURLs absolute
test('getURLs absolute', () => {
  const inputHTML = `
  <html>
    <body>
      <a href="https://github.com/RickC1218/WebCrawler">WebCrawler</a>
    </body>
  </html>
  `;
  const inputURL = 'https://github.com/RickC1218/WebCrawler';
  const actual = getURLs(inputURL, inputHTML);
  const expected = ['github.com/RickC1218/WebCrawler']
  expect(actual).toEqual(expected);
});

// Test 5 - getURLs relative
test('getURLs relative', () => {
  const inputHTML = `
  <html>
    <body>
      <a href="/RickC1218/WebCrawler">WebCrawler</a>
    </body>
  </html>
  `;
  const inputURL = 'https://github.com/RickC1218/WebCrawler';
  const actual = getURLs(inputURL, inputHTML);
  const expected = ['github.com/RickC1218/WebCrawler']
  expect(actual).toEqual(expected);
});

// Test 6 - getURLs relative and absolute
test('getURLs both', () => {
  const inputHTML = `
  <html>
    <body>
      <a href="/RickC1218/WebCrawler1">WebCrawler1</a>
      <a href="https://github.com/RickC1218/WebCrawler2">WebCrawler2</a>
    </body>
  </html>
  `;
  const inputURL = 'https://github.com/RickC1218/WebCrawler';
  const actual = getURLs(inputURL, inputHTML);
  const expected = ['github.com/RickC1218/WebCrawler1','github.com/RickC1218/WebCrawler2']
  expect(actual).toEqual(expected);
});

// Test 7 - getURLs invalid href
test('getURLs invalid', () => {
  const inputHTML = `
  <html>
    <body>
      <a href="RickC1218/WebCrawler">Invalid link</a>
    </body>
  </html>
  `;
  const inputURL = 'https://github.com/RickC1218/WebCrawler';
  const actual = getURLs(inputURL, inputHTML);
  const expected = []
  expect(actual).toEqual(expected);
});
