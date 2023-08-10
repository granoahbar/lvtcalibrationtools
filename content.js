// ADDING BUTTON TO THE DOM
const insertButton = () => {
  const button = document.createElement("button");
  button.textContent = "Open all cameras";
  button.addEventListener("click", openCameraTabs);

  // Apply CSS styles to the button
  button.style.backgroundColor = "blue";
  button.style.color = "white";
  button.style.border = "none";
  button.style.padding = "10px 20px";

  const targetElement = document.getElementById("help-center-menu");
  console.log(targetElement)
  if (targetElement) {
    console.log("target element logic running")
    targetElement.insertAdjacentElement('afterend', button);
  }
};

const openCameraTabs = () => {
  console.log("Run open camera logic");
};

if (window.location.href.includes("https://sp.liveviewtech.com/live-unit")) {
  insertButton();
}

// let extensionParagraphs = document.querySelectorAll("p")
// let extensionCredentials = {
//   username: null,
//   password: null
// }

// console.log(extensionParagraphs)

// extensionParagraphs.forEach((extensionParagraph) => {
//   const matchUsername = extensionParagraph.textContent.match(/Username: (\w+)/);
//   const matchPassword = extensionParagraph.textContent.match(/Password: (\w+)/);

//   if (matchUsername && matchUsername[1]) {
//     extensionCredentials.username = matchUsername[1];
//   }

//   if (matchPassword && matchPassword[1]) {
//     extensionCredentials.password = matchPassword[1];
//   }
// });

// console.log("Credentials:", extensionCredentials);