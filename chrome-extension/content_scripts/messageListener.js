
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startElementPicker") {
    startPickingElement();
    return sendResponse("ok");
  }
});

function startPickingElement() {
  document.addEventListener("click", onElementClick, true);

  // for highlight
  document.addEventListener("mouseover", onElementHover, true);
  document.addEventListener("mouseout", onElementLeave, true);
}

function onElementClick(event) {
  event.preventDefault();
  event.stopPropagation();

  chrome.runtime.sendMessage({ action: 'elementPicked', content: event.target.outerHTML });

  document.removeEventListener("click", onElementClick, true);
  document.removeEventListener("mouseover", onElementHover, true);
  document.removeEventListener("mouseout", onElementLeave, true);
  onElementLeave(event);
}

function onElementHover(event) {
  const target = event.target;
  target.style.outline = "2px solid #07C";
}

function onElementLeave(event) {
  const target = event.target;
  target.style.outline = "";
}