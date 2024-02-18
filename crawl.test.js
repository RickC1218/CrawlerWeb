const { normalizeUrl } = require('./crawl');
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


// Test 4 - main.js with no website provided