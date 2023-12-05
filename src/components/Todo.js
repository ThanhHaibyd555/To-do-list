import { useEffect, useRef, useState } from "react";

function Todo({
  name,
  completed,
  id,
  toggleTaskCompleted,
  deleteTask,
  editTask,
}) {
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current.focus();
    }else{
      editButtonRef.current.focus();
    }
  }, [isEditing]);

  function handlechane(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  }

  const viewTemplate = (
    <>
      <div className="checkbox_lebel">
        <div className="center_box">
          <input
            className="checkbox"
            type="checkbox"
            defaultChecked={completed}
            id={id}
            onClick={() => toggleTaskCompleted(id)}
          />
        </div>
        <div>
          <label className="todo-label" htmlFor={id}>
            {name}
          </label>
        </div>
      </div>
      <button
        className="btn_t"
        onClick={() => setEditing(true)}
        ref={editButtonRef}
      >
        Edit <span className="visually_hidden ">{name}</span>
      </button>
      <button className="btn_t btn_danger" onClick={() => deleteTask(id)}>
        Delete <span className="visually_hidden ">{name}</span>
      </button>
    </>
  );

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <label className="todo-label" htmlfor={id}>
        New name for {name}
      </label>
      <input
        id={id}
        className="todo-text"
        type="text"
        value={newName}
        onChange={handlechane}
        ref={editFieldRef}
      />
      <button className="btn_t" onClick={() => setEditing(false)}>
        Cancel <span className="visually_hidden ">{name}</span>
      </button>
      <button className="btn_t btn_danger" onClick={() => editTask(id)}>
        Save <span className="visually_hidden ">{name}</span>
      </button>
    </form>
  );

  return <li>{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
