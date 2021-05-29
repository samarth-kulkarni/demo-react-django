import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from 'react-router-dom';
function Edit() {
  // PLEASE READ DOCUMENTATION ABOUT useParams AND useHistory.
  // IT IS VERY IMPORTANT FOR FUNCTIONAL COMPONENTS.
  const { id } = useParams();
  const history = useHistory();
  useEffect(
    () =>
      axios
        .get("http://localhost:8000/groups/" + id + "/")
        .then((response) => setEditGroup({ id: response.data.id, name: response.data.name }))
        .catch((error) => console.error(error)),
    [id]
  );
  // Reading docs helps a lot when implementing new things.
  // @see https://reactrouter.com/web/guides/quick-start
  const [editGroup, setEditGroup] = useState({ id: "", name: "" });
  const handleUpdateGroup = () =>
    axios
      .put("http://localhost:8000/groups/" + id + "/", {
        name: editGroup.name,
      })
      .then((response) => history.push('/'))
      .catch((error) => console.error(error));

  return (
    <div className="App">
      <div className="form">
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

export default Edit;
