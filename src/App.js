import "./styles.css"

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

// LINK TO APP SAMPLE DATA: https://docs.google.com/spreadsheets/d/1eeldcA_OwP4DHYEvjG0kDe0cRys-cDPhc_E9P9G1e3I/edit#gid=0

// 👍 🤯 ⛔️


function App() {
  return (
    <>
    <HeaderComponent />
    <NewFactForm />
    <br />
    <main className="main">  
      <CategoryFilter />
      <FactList />
    </main>
    </>
  );
}

function HeaderComponent() {
  return (
    <header className="header">
        <div className="logo">
            <img src="logo.png" alt="Fact Share Logo" width="70"/>
            <h1>Fact Share</h1>
        </div>
        <button className="btn btn-open-form">Share a fact</button>
    </header>
  )
}

function NewFactForm() {
  return (
    <form className="fact-form">
        <input type="text" placeholder="Share a fact with the world..." />
        <input type="text" placeholder="URL to supporting source..." />
        <select>
            <option value="">Choose category:</option>
            <option value="science">Science</option>
            <option value="nature">Nature</option>
            <option value="history">History</option>
            <option value="technology">Technology</option>
            <option value="society">Society</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
        </select>
        <button className="btn btn-large">Post fact</button>
    </form>
  )
}

function CategoryFilter() {
  return (
    <aside>
        <ul>
            <li>
                <button className="btn btn-topic">All</button>
            </li>
            <li>
                <button className="btn btn-topic topic-science">Science</button>
            </li>
            <li>
                <button className="btn btn-topic topic-nature">Nature</button>
            </li>
        </ul>
    </aside>
  )
}

function displayFact(fact) {
  let categoryColor = CATEGORIES.find((cat) => cat.name === fact.category).color;
  return(
    <li className="fact-item" key={fact.id}>
        <p>{fact.text}</p>
        <span className="fact-tag" style={{backgroundColor : categoryColor}}>{fact.category}</span>
    </li>
  )
}

function FactList() {
  const facts = initialFacts;

  return (
    <section>
        <p> Fact List </p>
        <ul className="fact-list">
          {facts.map((fact) => (displayFact(fact)))}
        </ul>
    </section>
  )
}

export default App;