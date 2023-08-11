chrome.runtime.sendMessage({ action: "openTabs", urls: matchingUrls }, (response) => {
    console.log("Message sent to background script");
  });