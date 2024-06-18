
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(`[content] ${JSON.stringify(message)}`)
  if (message.action === "startElementPicker") {
    startPickingElement();
    return sendResponse("ok");
  }
});

function startPickingElement() {
  document.addEventListener("click", onElementClick, true);

  function onElementClick(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('elementPicked', event.target.innerText)
    chrome.runtime.sendMessage({ action: 'elementPicked', content: event.target.innerText }, (response) => console.log(response));

    document.removeEventListener("click", onElementClick, true);
  }
}

