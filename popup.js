// popup.js

document.addEventListener("DOMContentLoaded", () => {
  const insertCrosshairsButton = document.getElementById("insertCrosshairsButton");
  const removeCrosshairsButton = document.getElementById("removeCrosshairsButton");
  let iconsInserted = false; // Keep track of whether icons are inserted

  // Define the createSvgIcon function
  function createSvgIcon(height, fill, zIndex, top, left, opacity) {
    const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgIcon.setAttribute("height", height);
    svgIcon.setAttribute("viewBox", "0 0 512 512");

    // Create an SVG path element for the icon
    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z");

    // Apply styles to the SVG icon
    svgIcon.style.fill = fill;
    svgIcon.style.position = "absolute"; // Position the icon
    svgIcon.style.zIndex = zIndex;
    svgIcon.style.top = top || "50%";
    svgIcon.style.left = left || "50%";
    svgIcon.style.transform = "translate(-50%, -50%)"; // Center the icon
    svgIcon.style.opacity = opacity || 1; // Set opacity (default: fully opaque)

    // Append the SVG path to the SVG icon
    svgIcon.appendChild(svgPath);

    return svgIcon;
  }

  // Function to insert icons
  function insertIcons(tabId) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        const targetElement = document.querySelector("[data-testid='clickToCenter']");

        // Create and position the bigger SVG icon with adjusted opacity
        const svgIcon1 = createSvgIcon("2em", "#0B0B0B", 1, "50%", "50%", 0.75); // Opacity around 75%
        targetElement.appendChild(svgIcon1);

        // Create and position the smaller SVG icon over the bigger one
        const svgIcon2 = createSvgIcon(".5em", "#17C3B2", 2, "50%", "50%");
        targetElement.appendChild(svgIcon2);
      },
    });
  }

  // Function to remove icons
  function removeIcons(tabId) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        const targetElement = document.querySelector("[data-testid='clickToCenter']");
        targetElement.innerHTML = ''; // Clear the target element to remove icons
      },
    });
  }

  // Check if the data-testid element is present on the page
  const checkAndInsertIcons = () => {
    const targetElement = document.querySelector("[data-testid='clickToCenter']");
    const isLiveViewTechURL = window.location.href.includes("https://sp.liveviewtech.com/live-unit");

    if (!iconsInserted && targetElement && isLiveViewTechURL) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
        insertIcons(tabId);
        iconsInserted = true;
      });
    }
  };

  // Monitor for changes in the DOM and insert icons when needed
  const observer = new MutationObserver(checkAndInsertIcons);
  observer.observe(document.body, { attributes: false, childList: true, subtree: true });

  // Event listeners for the buttons
  insertCrosshairsButton.addEventListener("click", () => {
    checkAndInsertIcons();
  });

  removeCrosshairsButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      removeIcons(tabId);
      iconsInserted = false;
    });
  });
});
