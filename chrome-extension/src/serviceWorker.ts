
// this won't be emitted while popup is configured
chrome.action.onClicked.addListener((tab) => {
  chrome.action.setTitle({
    tabId: tab.id,
    title: `You are on tab: ${tab.id}`});
});
