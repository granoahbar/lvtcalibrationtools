document.addEventListener("DOMContentLoaded", () => {
  const openCamerasButton = document.getElementById("openCamerasButton");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    openCamerasButton.addEventListener("click", () => {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
          const stringsToCheck = ["5010", "5015", "5020"];
          const openedLinks = new Set(); // Define openedLinks within the content script

          const links = document.querySelectorAll("a");
          links.forEach((link) => {
            const linkUrl = link.getAttribute("href");
            if (linkUrl) {
              stringsToCheck.forEach((str) => {
                if (linkUrl.includes(str) && !openedLinks.has(linkUrl)) {
                  openedLinks.add(linkUrl);
                  window.open(linkUrl, "_blank");
                }
              });
            }
          });
        },
      });
    });
  });
});
