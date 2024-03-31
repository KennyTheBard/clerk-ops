chrome.tabs
  .query({
    active: true,
    lastFocusedWindow: true,
  })
  .then(([tab]) => {
    var messageElement = document.getElementById("message");
    if (messageElement) {
      messageElement.textContent = `You are on tab: ${tab.id}`;
    }
  });
