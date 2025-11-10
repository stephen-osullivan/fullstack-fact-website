console.log("Script loaded successfully.");

const factformElement = document.querySelector(".fact-form");
const btnOpenForm = document.querySelector(".btn-open-form");
const factListElement = document.querySelector(".fact-list");

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#af189bff" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
  { name: "nature", color: "#6ee674ff" },
];

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

function getCategoryColor(categoryName) {
  const category = CATEGORIES.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
  );
  return category ? category.color : "#000000"; // default to black if not found
};

function createFactHTML(fact) {
  return `
    <li class="fact-item">
        <p>
            💡 ${fact.text}
            <a class='source' href="${fact.source}" target="_blank">(Source)</a>
            <span class="fact-tag" style="background-color: ${getCategoryColor(fact.category)}">
              #${fact.category}#
            </span>
        </p>
        
        <div class="vote-buttons">
            <button>👍 ${fact.upvotes}</button>
            <button>👎 ${fact.downvotes}</button>
        </div>
    </li>`
};

function createFactList(factList) {
  factListElement.innerHTML = ""; // Clear existing facts
  factListElement.insertAdjacentHTML(
    "afterbegin", 
    factList.map(fact => createFactHTML(fact)).join("")
  );
};


// load data from Supabase database and create DOM elements for each fact
async function loadFacts() {
  // call superbase RESTful API to get the data
  const res = await fetch("https://nwfhxbyljklxfqidrxth.supabase.co/rest/v1/facts", {
    headers : {
      apikey: 
        "sb_publishable_ouPNKNRwtvX0M9DVPbVYsg_ZxL57ebq",
      authorization :
        "Bearer sb_publishable_ouPNKNRwtvX0M9DVPbVYsg_ZxL57ebq",
    }
  });
  // convert to json format
  const data = await res.json();
  // format into HTML elements
  createFactList(data);
}
loadFacts();
