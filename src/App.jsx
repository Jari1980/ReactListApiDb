import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState([]);
  const [name, setName] = useState("");
  const [eatable, setEatable] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("http://localhost:8080/list");
      const body = await result.json();
      setItem(body);
      console.log("test");
    }
    fetchData();
  }, []);

  
    const listItems = item.map((item) => {
      return (
        <li key={item.id}>
          <span>{item.name}</span>
          <span>{item.eatable}</span>
          <button>Remove</button>
        </li>
      )
    })


  return (
    <>
      <h1>Good Thing List</h1>
      <br />
      <ul>
        {listItems}
        </ul>
    </>
  );
}

export default App;
