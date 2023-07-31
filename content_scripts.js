// create 2 variables. on named "password" that will equal "hvCamera1" and another named "username" that will equal "admin"
// search window for specific URL
// if url contains specific url, then insert a button called "open all cameras"
// listen for a click on this button
// if the button is clicked, then search the tabs html for links that contain certain urls
// For each url that is found in the html, open a new chrome tab using that url


// This background script listens for button clicks and opens new tabs with specific URLs

let password = "hvCamera1";
let username = "admin";

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const specificUrl = "https://example.com"; // Replace with the specific URL you want to check
      const currentUrl = tabs[0].url;

      if (currentUrl.includes(specificUrl)) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: insertButton
        });
      }
    }
  });
});

function insertButton() {
  const button = document.createElement("button");
  button.textContent = "Open all cameras";
  button.addEventListener("click", openCameraTabs);
  document.body.appendChild(button);
}

function openCameraTabs() {
  const cameraUrls = ["https://camera1.com", "https://camera2.com"]; // Add the specific camera URLs here

  cameraUrls.forEach((url) => {
    chrome.tabs.create({ url: url });
  });
}
