document.addEventListener("DOMContentLoaded", () => {
  const openCamerasButton = document.getElementById("openCamerasButton");
  const insertCrosshairsButton = document.getElementById("insertCrosshairsButton");

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
                      const inputElements = newWindow.document.querySelectorAll("input[type='text'], input[type='password']");
                      if (inputElements.length >= 2) {
                        const usernameField = inputElements[0];
                        const passwordField = inputElements[1];

                        // Simulate typing the username and password
                        usernameField.value = username;
                        passwordField.value = password;

                        // Simulate clicking the submit button
                        const submitButton = newWindow.document.querySelector("button[type='submit']");
                        if (submitButton) {
                          submitButton.click();
                        }
                      }
                    });
                  }
                }
              });
            }
          });
        },
      });
    });
    insertCrosshairsButton.addEventListener("click", () => {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
            // Create an image element
          const image = document.createElement("img");
          image.src = "https://clipart-library.com/img1/2026467.png"; // Replace with your image URL
          image.alt = "Crosshairs"; // Optional, set the alt text

          image.style.display = "block"; // Ensures the image takes up the full width
          image.style.margin = "auto";   // Center the image both horizontally
          image.style.width = "50px";    // Set the width to 20 pixels
          image.style.height = "50px";   // Set the height to 20 pixels
          image.style.zIndex = "9999"; // Set a high z-index value to ensure the image is above other elements

          console.log("works")
          // Select the target element where you want to insert the image
          const targetElement = document.querySelector("[data-testid='clickToCenter']");

          targetElement.style.display = "flex";
          targetElement.style.alignItems = "center";
          targetElement.style.justifyContent = "center";

          // Append the image element to the target element
          targetElement.appendChild(image);
        },
      });
    });
  });
});