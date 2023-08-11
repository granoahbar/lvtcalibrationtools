document.addEventListener("DOMContentLoaded", () => {
  const openCamerasButton = document.getElementById("openCamerasButton");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    openCamerasButton.addEventListener("click", () => {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
          const stringsToCheck = ["5010", "5015", "5020"];
          const openedLinks = new Set();

          const links = document.querySelectorAll("a");
          links.forEach((link) => {
            const linkUrl = link.getAttribute("href");
            if (linkUrl) {
              stringsToCheck.forEach((str) => {
                if (linkUrl.includes(str) && !openedLinks.has(linkUrl)) {
                  openedLinks.add(linkUrl);

                  const rowText = link.parentElement.textContent;
                  const matchUsername = rowText.match(/username: (\w+)/i);
                  const matchPassword = rowText.match(/password: (\w+)/i);

                  if (matchUsername && matchPassword) {
                    const username = matchUsername[1].replace("Password", "");
                    const password = matchPassword[1];

                    console.log("Link URL:", linkUrl);
                    console.log("Username:", username);
                    console.log("Password:", password);

                    const newWindow = window.open(linkUrl, "_blank");
                    newWindow.addEventListener("load", () => {
                      const usernameField = newWindow.document.activeElement;
                      const passwordField = usernameField.nextElementSibling;

                      // Set focus to the username field
                      usernameField.focus();

                      // Simulate typing the username and pressing 'Tab'
                      const tabKeyEvent = new KeyboardEvent("keydown", { key: "Tab" });
                      usernameField.dispatchEvent(tabKeyEvent);

                      // Simulate typing the password and pressing 'Enter'
                      passwordField.value = password;
                      const enterKeyEvent = new KeyboardEvent("keydown", { key: "Enter" });
                      passwordField.dispatchEvent(enterKeyEvent);
                    });
                  }
                }
              });
            }
          });
        },
      });
    });
  });
});
