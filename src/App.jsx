import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState([]);
  const [name, setName] = useState("");
  const [eatable, setEatable] = useState(true);
  const [id, setId] = useState("");

  const fetchData = async () => {
    const result = await fetch("http://localhost:8080/list");
      const body = await result.json();
      setItem(body);
      console.log("test");
  }

  useEffect(() => {
    //async function fetchData() {
      //const result = await fetch("http://localhost:8080/list");
      //const body = await result.json();
      //setItem(body);
      //console.log("test");
    //}
    fetchData();
  }, []);

  const listItems = item.map((item) => {
    return (
      <li key={item.id}>
        <span>{item.name}</span>
        <span>{item.eatable}</span>
        <button>Remove</button>
      </li>
    );
  });

  const handleClick = (event) => {
    fetch('http://localhost:8080/list/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        eatable: eatable,
      })  
    })
    fetchData()
    setName("")
    setEatable(false)
  }



  return (
    <>
      <h1>Good Thing List</h1>
      <br />
      <br />
      <ul>{listItems}</ul>
      <br />
      <form>
        <label for="AddThing">Add a Good Thing</label>
        <input type="text" id="AddThing" value={name} onChange={() => setName(event.target.value)}/>
        <label for="Eatable">Eatable</label>
        <input type="checkbox" id="Eatable" value={eatable} onChange={() => setEatable(event.target.value)} />
        <button type="button" onClick={handleClick}>Submit</button>
      </form>
    </>
  );
}

export default App;
