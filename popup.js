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

    insertCrosshairsButton.addEventListener("click", () => {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
          const targetElement = document.querySelector("[data-testid='clickToCenter']");

          // Create an SVG element using the provided SVG code
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

            // Append the SVG icon to the target element
            targetElement.appendChild(svgIcon);
          }

          // Create and position the bigger SVG icon with adjusted opacity
          createSvgIcon("2em", "#0B0B0B", 1, "50%", "50%", 0.75); // Opacity around 75%

          // Create and position the smaller SVG icon over the bigger one
          createSvgIcon(".5em", "#17C3B2", 2, "50%", "50%");
        },
      });
    });
  });
});
