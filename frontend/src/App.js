import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Edit from "./Edit";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}>
        </Route>
        <Route exact path="/edit/:id">
          <Edit />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  const [groups, setGroups] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const fetchDataFromBackend = () => axios
    .get("http://localhost:8000/groups/")
    .then((response) => setGroups(response.data))
    .catch((error) => console.error(error))
  useEffect(fetchDataFromBackend, []);
  const handleNewGroup = () =>
    axios
      .post("http://localhost:8000/groups/", { name: newGroup })
      .then((response) => fetchDataFromBackend())
      .catch((error) => console.error(error));

  const handleDeleteGroup = (id) =>
    axios
      .delete("http://localhost:8000/groups/" + String(id) + "/")
      .then((response) => fetchDataFromBackend())
      .catch((error) => console.error(error));
  return (
    // This can be refactored to another file called Home.js, I'm just lazy to do it. 
    <div className="App">
      <div className="form">
        <input
          type="text"
          placeholder="Add a new group!"
          onChange={(e) => setNewGroup(e.target.value)}
          value={newGroup}
        />
        <button onClick={() => handleNewGroup()}>Add</button>
      </div>
      <ul>
        {groups.length > 0 &&
          groups.map((group) => (
            <li key={group.id}>
              {group.name} -{" "}
              <button onClick={() => handleDeleteGroup(group.id)}>X</button>
              <Link to={`/edit/` + group.id}><button>Update</button></Link>
            </li>
          ))}
      </ul>
    </div>)
}

export default App;
