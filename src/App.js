import React, { useState, useEffect } from "react";

import List from "./Components/List";
import Alert from "./Components/Alert";


const getLocalStorage = () =>{
  const list = localStorage.getItem("list");
  if(list){
    return JSON.parse(localStorage.getItem("list"));
  }else{
    return [];
  }
}

function App() {
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "please enter value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title:name };
          }
          return item;
        })
      );

      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "value changed", "success");

    } else {
      showAlert(true, "item added to the list", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "empty list", "danger");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "item deleted", "danger");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const selectedItem = list.find((item) => item.id === id);
   
    setIsEditing(true);
    setEditId(id);
    setName(selectedItem.title);
  };


  useEffect(() => {
    localStorage.setItem("list",JSON.stringify(list));
  }, [list]);
  

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h2>My Grocery Bud</h2>
        <div className="form-control">
          <input
            className="grocery"
            placeholder="5 task you did today?"
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
