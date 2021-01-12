export function convertUrl(localUrl) {
    const { location } = window;
    if (location.hostname.includes("codesandbox.io")) {
      const url = new URL(localUrl);
      const subdomain = getSubdomain(location.hostname);
      return `${location.protocol}//${subdomain}-${url.port}.sse.codesandbox.io${url.pathname}`;
    }
  
    return localUrl;
  }
  
function getSubdomain(hostname) {
    return hostname.substr(0, hostname.indexOf("."));
}
  