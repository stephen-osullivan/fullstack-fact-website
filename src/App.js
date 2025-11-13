import { useEffect, useState } from "react";
import supabase from "./supabase.js";
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
].sort((a, b) => a.name.localeCompare(b.name));

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    upvotes: 24,
    mindsBlown: 9,
    downvotes: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    upvotes: 11,
    mindsBlown: 2,
    downvotes: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    upvotes: 8,
    mindsBlown: 3,
    downvotes: 1,
    createdIn: 2015,
  },
];

function App() {

  // load facts from supabase first time component loads
  useEffect(function() {
    async function getFacts() {
      let { data: facts, error } = await supabase
        .from('facts')
        .select('*')
        .order('upvotes', { ascending: false })
        .limit(1000);
      console.log(facts);
      if (error) console.log("Error fetching facts:", error);
      else console.log("Facts fetched successfully:", facts);
    }
    let initialFacts=getFacts();
  }
  , []); // empty dependency array -> runs once at the beginning

  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState(initialFacts);
  const [categoryChoice, setCategoryChoice] = useState("all");

  return (
    <>
    <HeaderComponent showForm={showForm} setShowForm={setShowForm}/>
    {showForm ? <NewFactForm /> : null}
    <br />
    <main className="main">  
      <CategoryFilter 
        categoryChoice={categoryChoice} 
        setCategoryChoice={setCategoryChoice}
      />
      <FactList facts= {facts} categoryChoice = {categoryChoice}/>
    </main>
    </>
  );
}

function HeaderComponent({ showForm, setShowForm }) {
  return (
    <header className="header">
        <div className="logo">
            <img src="logo.png" alt="Fact Share Logo" width="70"/>
            <h1>Fact Share</h1>
        </div>
        <button 
          className="btn btn-open-form" 
          onClick={() => setShowForm(!showForm)}
        >
          Share a fact
        </button>
    </header>
  );
}

function NewFactForm() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  const categories = CATEGORIES;

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    console.log({text, source, category});

    // validate data
    if (textLength > 200) {
      alert("Fact is too long! Please keep it under 200 characters.");
      return;
    }
    else if (!(text && source && category)) {
      alert("Please fill in all fields.");
      return;
    }
    else {
      // create a new fact object
      const newFact = {
        text,
        source,
        category,
        upvotes: 0,
        downvotes: 0,
        mindsBlown: 0,
        createdIn: new Date().getFullYear(),
      };
      console.log(newFact);
      console.log(process.env.SUPABASE_KEY);
      // add the new fact to the UI

      // clear the form
      setText("");
      setSource("");
      setCategory("");
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Share a fact with the world..."
          value ={text} 
          onChange={(e) => setText(e.target.value)}
        />
        <span>{200 - textLength} characters remaining</span>
        <input 
          type="text" 
          placeholder="URL to supporting source..."
          value ={source} 
          onChange={(e) => setSource(e.target.value)} 
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Choose category:</option>
            {categories.map((c) => (
              <option key={`${c.name}-option`} value={c.name}>{c.name}</option>
            ))}
        </select>
        <button className="btn btn-large">Post fact</button>
    </form>
  );
}

function CategoryFilter({categoryChoice, setCategoryChoice}) {

  const categories = CATEGORIES;

  function displayCategoryButton(category) {
    return (
      <li key ={`${category.name}-button`}>
        <button 
          className="btn btn-topic" 
          style={{backgroundColor : category.color}}
          onClick={() => setCategoryChoice(categoryChoice !== category.name ? category.name : "all")}
        >
          {category.name}
        </button>
      </li>
    );
  }

  return (
    <aside>
      <p>Category Filter</p>
      <br></br>
      <ul>
        <li key='all-button'>
          <button 
            className="btn btn-all" 
            onClick={()=>setCategoryChoice("all")}
          >
            All
          </button>
        </li>
        {categories.map((c) => (displayCategoryButton(c)))}
      </ul>
    </aside>
  )
}


function getCategoryColor(categoryName) {
  const category = CATEGORIES.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
  );
  return category ? category.color : "oklch(81% 0.117 11.638)"; // default if not found
}

function FactList( {facts, categoryChoice} ) {

  facts = categoryChoice === "all" ? 
    facts : 
    facts.filter(fact => fact.category.toLowerCase() === categoryChoice.toLowerCase());

  return (
    <section>
        <p> Fact List ({facts.length} facts)</p>
        <br></br>
        <ul className="fact-list">
          {facts.map((fact) => (
            <Fact key={fact.id} fact={fact}/>
          ))}
        </ul>
    </section>
  )
}

function Fact({fact}) {
  let categoryColor = getCategoryColor(fact.category);
  return(
    <li className="fact-item" key={fact.id}>
        <p>
          {fact.text}
          <a className="source" href={fact.source} target="_blank" rel="noreferrer">({fact.source})</a>
          <span className="fact-tag" style={{backgroundColor : categoryColor}}>{fact.category}</span>
        </p>
        
        <div className="vote-buttons">
            <button>👍 {fact.upvotes}</button>
            <button>👎 {fact.downvotes}</button>
            <button>🫨 {fact.mindsBlown}</button>
        </div>
    </li>
  )
}


export default App;