chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.includes("https://sp.liveviewtech.com/live-unit")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId, allFrames: true },
            files: ['content.js']
          });
    }
  });
  