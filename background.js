chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openTabs") {
      const urls = request.urls;
      urls.forEach((url) => {
        chrome.tabs.create({ url: url });
      });
      sendResponse({ message: "Tabs opened" });
    }
  })