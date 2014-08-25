chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    resizable: false,
    id: "partymode",
    bounds: {
      width: 320,
      height: 480
    },
    frame: {
      color: '#f5f6f8'
    }
  });
});
