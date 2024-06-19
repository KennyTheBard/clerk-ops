chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const startElementPickerBtn = document.getElementById(
    "startElementPickerBtn"
  );
  startElementPickerBtn.addEventListener("click", () => {
    chrome.tabs
      .query({
        active: true,
        lastFocusedWindow: true,
      })
      .then(([tab]) => {
        chrome.tabs.sendMessage(tab.id, { action: "startElementPicker" });
      });
  });
});
