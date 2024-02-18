
// Normalize URL
function normalizeUrl(url) {
  const urlObject = new URL(url);
  const hostPath = urlObject.host + urlObject.pathname;
  if (hostPath.endsWith('/')) {
    return hostPath.substring(0, hostPath.length - 1);
  }
  return hostPath;
}

module.exports = {
  normalizeUrl
};