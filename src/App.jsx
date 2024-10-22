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
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleRemove(id) {
    fetch("http://localhost:8080/list/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: id,
    });
    fetchData();
    fetchData();
  }

  const listItems = item.map((item) => {
    return (
      <li key={item.id}>
        <span className="column" id="spanName">
          {item.name}
        </span>
        <span className="column" id="spanEatable">
          Is eatable: {item.eatable.toString()}
        </span>
        <button
          type="button"
          className="column"
          id="buttonRemove"
          onClick={() => handleRemove(item.id)}
        >
          Remove
        </button>
      </li>
    );
  });

  const handleClick = (event) => {
    fetch("http://localhost:8080/list/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        eatable: eatable,
      }),
    });
    fetchData();
    fetchData();
    setName("");
    setEatable(false);
  };

  const handleSeed = (event) => {
    fetch("http://localhost:8080/list/seed", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    fetchData();
    fetchData();
  };

  return (
    <>
      <div id="listDiv">
        <h1>Good Thing List</h1>
        <br />
        <br />
        <ul id="listUl">{listItems}</ul>
        <br />
        <form>
          <div id="formDiv">
            <div id="formInputDiv">
              <label for="AddThing">Add a Good Thing</label>
              <input
                type="text"
                id="AddThing"
                value={name}
                onChange={() => setName(event.target.value)}
              />
              <label for="Eatable">Eatable</label>
              <input
                type="checkbox"
                id="Eatable"
                value={eatable}
                onChange={() => setEatable(event.target.value)}
              />
            </div>
            <div id="buttonAddDiv">
            <button type="button" id="buttonAdd" onClick={handleClick}>
              Submit
            </button>
            </div>
          </div>
        </form>
        <br />
        <br />
        <button type="button" id="buttonSeed" onClick={handleSeed}>
          Load seeded data
        </button>
      </div>
    </>
  );
}

export default App;
