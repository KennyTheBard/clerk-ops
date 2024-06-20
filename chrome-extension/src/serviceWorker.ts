chrome.runtime.onMessage.addListener((extMsg, sender, extSendResponse) => {
  if (extMsg.action === "elementPicked") {
    return chrome.tabs
      .create({ url: "http://localhost:4044/loader", active: false })
      .then((tab) => {
        console.log(tab);
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id! },
            func: function () {
              chrome.runtime.onMessage.addListener(
                (tabMsg, sender, tabSendResponse) => {
                  if (tabMsg.action === "appendContent") {
                    const textarea = document.getElementById(
                      "clerk-ops-textarea-input"
                    ) as HTMLTextAreaElement;
                    if (!textarea) {
                      // TODO: message for error
                      return;
                    }
                    textarea.value += tabMsg.content;
                  }
                  tabSendResponse('ok');
                }
              );
            },
          },
          () => {
            chrome.tabs.sendMessage(
              tab.id!,
              { action: "appendContent", content: extMsg.content },
              () => {
                extSendResponse("ok");
              }
            );
          }
        );
      });
  }
});
