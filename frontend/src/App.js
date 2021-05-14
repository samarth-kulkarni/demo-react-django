import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [groups, setGroups] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [added, setAdded] = useState(false);
  const [editGroup, setEditGroup] = useState({ id: "", name: "" });
  useEffect(
    () =>
      axios
        .get("http://localhost:8000/groups/")
        .then((response) => setGroups(response.data))
        .catch((error) => console.error(error)),
    [added]
  );
  const handleNewGroup = () =>
    axios
      .post("http://localhost:8000/groups/", { name: newGroup })
      .then((response) => setAdded(!added))
      .catch((error) => console.error(error));

  const handleUpdateGroup = () =>
    axios
      .put("http://localhost:8000/groups/" + String(editGroup.id) + "/", {
        name: editGroup.name,
      })
      .then((response) => setAdded(!added))
      .catch((error) => console.error(error));

  const handleDeleteGroup = (id) =>
    axios
      .delete("http://localhost:8000/groups/" + String(id) + "/")
      .then((response) => setAdded(!added))
      .catch((error) => console.error(error));

  return (
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
            </li>
          ))}
      </ul>
      <div className="form">
        <input
          type="text"
          placeholder="Enter ID to edit."
          onChange={(e) => setEditGroup({ ...editGroup, id: e.target.value })}
          value={editGroup.id}
        />
        <input
          type="text"
          placeholder="Edit group!"
          onChange={(e) => setEditGroup({ ...editGroup, name: e.target.value })}
          value={editGroup.name}
        />
        <button onClick={() => handleUpdateGroup()}>Update</button>
      </div>
    </div>
  );
}

export default App;
