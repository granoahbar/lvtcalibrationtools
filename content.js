// chrome.runtime.sendMessage({ action: "openTabs", urls: matchingUrls }, (response) => {
//   console.log("Message sent to background script");
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "insertIcons") {
    // Call the function to insert icons from popup.js
    insertIcons();
  } else if (message.action === "removeIcons") {
    // Call the function to remove icons from popup.js
    removeIcons();
  }
});
