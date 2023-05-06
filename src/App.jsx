import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskValue, setEditingTaskValue] = useState("");
  const [filter, setFilter] = useState("all"); //all,completed,active

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      let uuid = self.crypto.randomUUID();
      setTasks([...tasks, { id: uuid, text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleTaskCompletionToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id) => {
    setEditingTaskId(id);
    setEditingTaskValue(tasks.filter((task) => task.id === id)[0].text);
  };

  const handleSaveTask = (id) => {
    if (editingTaskValue.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: editingTaskValue } : task
        )
      );
      setEditingTaskId(null);
      setEditingTaskValue("");
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return task.completed;
    } else {
      return !task.completed;
    }
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="container">
      <h1>Simple Todo List</h1>

      <div>
        <strong>Total tasks:</strong> {totalTasks} |{" "}
        <strong>Completed tasks:</strong> {completedTasks}
      </div>

      <div className="add-Task">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your Task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="filter-Task">
        <label htmlFor="filter">Filter tasks: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskCompletionToggle(task.id)}
            />
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingTaskValue}
                  onChange={(e) => setEditingTaskValue(e.target.value)}
                />
                <button onClick={() => handleSaveTask(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                <div className="control-buttons">
                  <button onClick={() => handleEditTask(task.id)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
