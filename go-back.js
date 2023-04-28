const script = document.createElement("script");
script.textContent = `
  const r = new RegExp('^(?:[a-z+]+:)?//', 'i');
  const originalPushState = history.pushState;
  history.pushState = function (state, title, url) {
    // If url is null, relative or current then it's invalid
    if (!url || !r.test(url) || url === window.location.href) {
      console.error("Invalid URL for pushState");
      return;
    }
    originalPushState.apply(this, arguments);
  };
`;
document.documentElement.appendChild(script);
script.remove();