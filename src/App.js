import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";


const taskss = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

function App() {
  const [tasks, setTasks] = useState(taskss);
  const [filter, setFilter] = useState("All");
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]); //phan con lai cua task co nghia la 3 task ban dau new task la task moi dk theem vao
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    console.log(remainingTasks);
    setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id) {
    const updateTask = taskss.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updateTask);
  }

  function editTask(id, newName) {
    const editTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editTaskList);
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasknoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasknoun} remaining`;

  return (
    <div className="container">
      <Form addTask={addTask} />
      <div className="container_btn">
        <div className="wraped_btn">{filterList}</div>
      </div>

      <div className="container_task">
        <div className="wraped_task">
          <h1 className="task_remaining">{headingText}</h1>
          <ul>{taskList}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
