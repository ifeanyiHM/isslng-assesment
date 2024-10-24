import { useEffect, useState } from "react";
import "./App.css";

const Task = [
  {
    text: "to secure a job",
    completed: false,
  },
  {
    text: "to read a book",
    completed: true,
  },
  {
    text: "to visit mom",
    completed: false,
  },
  {
    text: "to sleep after work",
    completed: true,
  },

  {
    text: "to attend tech conference",
    completed: false,
  },
];

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(Task);
  const [textEdit, setTextEdit] = useState("");
  const [textEditIndex, setTextEditIndex] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  //add a task
  const addTask = () => {
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
    setToast(true);
    setToastMessage("Task Added");
  };

  //check a task as complete
  const completedTask = (id) => {
    setTasks((tasks) =>
      tasks.map((task, index) =>
        index === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //delete a task
  const deleteTask = (id) => {
    alert("Are you sure you want to delete this task?");
    setTasks((tasks) => tasks.filter((_, index) => index !== id));
    setToast(true);
    setToastMessage("Task Deleted");
  };

  //delete only completed tasks
  const deleteCompletedTask = (id) => {
    alert("This would delete all completed task.");
    setTasks((tasks) => tasks.filter((task) => !task.completed));
    setToast(true);
    setToastMessage("All Completed task deleted");
  };

  //delete all tasks
  const deleteAllTask = () => {
    alert("This will clear all you todo list.");
    setTasks([]);
    setToast(true);
    setToastMessage("All task have been removed");
  };

  //edit a task
  const editTask = (id) => {
    setTextEditIndex(id);
    setTextEdit(tasks[id].text);
  };

  //save edited task
  const updateTask = () => {
    setTasks((tasks) =>
      tasks.map((todos, index) =>
        index === textEditIndex ? { ...todos, text: textEdit } : todos
      )
    );
    setTextEditIndex(null);
    setTextEdit("");
    setToast(true);
    setToastMessage("Your task have been updated");
  };

  //set timeout for toast message
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div>
      {toast && <span className="toast">{toastMessage}</span>}
      <h1>Todo App</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li style={{ listStyleType: "decimal" }} key={index}>
            {textEditIndex === index ? (
              <div className="task">
                <input
                  type="text"
                  value={textEdit}
                  onChange={(e) => setTextEdit(e.target.value)}
                />
                <button onClick={updateTask}>update text</button>
              </div>
            ) : (
              <div className="task">
                <span className="input">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => completedTask(index)}
                  />

                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "",
                    }}
                  >
                    {task.text}
                  </span>
                </span>
                <span className="btn">
                  <button onClick={() => deleteTask(index)}>🚮</button>
                  <button onClick={() => editTask(index)}>✍</button>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="clear">
        {tasks.length > 0 && (
          <button onClick={deleteAllTask}>Clear all task</button>
        )}
        {tasks.filter((task) => task.completed).length > 0 && (
          <button onClick={deleteCompletedTask}>Remove completed tasks</button>
        )}
      </div>
    </div>
  );
}

export default App;
