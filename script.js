console.log("Script loaded successfully.");

const factformElement = document.querySelector(".fact-form");
const btnOpenForm = document.querySelector(".btn-open-form");

// Toggle the visibility of the share fact form when the button is clicked
btnOpenForm.addEventListener("click", function () {
  if (factformElement.classList.contains("hidden")) {
    factformElement.classList.remove("hidden");
    btnOpenForm.textContent = "Close";
  } else {
    factformElement.classList.add("hidden");
    btnOpenForm.textContent = "Share a Fact";
  }
});