chrome.runtime.sendMessage({ action: "openTabs", urls: matchingUrls }, (response) => {
    console.log("Message sent to background script");
  });
  chrome.runtime.sendMessage({ action: "insertCrosshairs", urls: matchingUrls }, (response) => {
    console.log("Message sent to background script");
  });