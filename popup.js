document.getElementById("toggleBot").addEventListener("click", () => {
  const toggleValueInterval = document.getElementById(
    "toggleValueInterval"
  ).value;
  const isEmojis = document.getElementById("messageType").value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "startClickingChat",
      valueInterval: toggleValueInterval,
      messageType: isEmojis,
    });
  });
});

document.getElementById("toggleBotStop").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "stopClickingChat" });
  });
});
document.getElementById("toggleBotReset").addEventListener("click", () => {
  const toggleValueInterval = document.getElementById(
    "toggleValueInterval"
  ).value;
  const isEmojis = document.getElementById("messageType").value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "resetClickingChat",
      valueInterval: toggleValueInterval,
      messageType: isEmojis,
    });
  });
});
