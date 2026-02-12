"use strict";

// Element Access Pattern

// const elementButtons = {
//   firstButton: document.getElementById("myButton"),
//   secondButton: document.getElementById("myButton2"),
// };

// const { firstButton } = elementButtons;
// firstButton.addEventListener("click", () => console.log("myButton click"));

// Class definition pattern

// const elementButtons2 = {
//   secondButton: document.getElementById("myButton2"),
// };

// const { secondButton } = elementButtons2;

// class UIComponent {
//   constructor(elementId) {
//     this.element = document.getElementById(elementId);
//   }

//   show() {
//     this.element.style.display = "block";
//   }

//   hide() {
//     this.element.style.display = "none";
//   }
// }

// const buttonToggle = new UIComponent("myButton");

// secondButton.addEventListener("click", () => buttonToggle.hide());

// Event delegation pattern

// const list = document.getElementById("myList");
// list.addEventListener("click", (event) => {
//   if (event.target.tagName === "LI") {
//     console.log("Clicked on:", event.target.textContent);
//   }
// });

// DOM update pattern (example 3 html)
// const list3 = document.getElementById("myList");
// const items = ["Item 1", "Item 2", "Item 3"];

// items.forEach((item) => {
//   const li = document.createElement("li");
//   li.textContent = item;
//   list3.appendChild(li);
// });

