import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddTask from "./AddTask";

const TaskList = () => {
  // Initialize tasks state with data from local storage
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("none");
  // Function to handle deleting a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Function to handle marking a task as completed
  const markAsCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
 
  // Function to handle filtering tasks based on status and priority
  useEffect(() => {
    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (task) => (filterStatus === "completed") === task.completed
      );
    }
    if (filterPriority !== "none") {
      filtered = filtered.filter((task) => task.priority === filterPriority);
    }
    setFilteredTasks(filtered);
  }, [tasks, searchTerm, filterStatus, filterPriority]);

 // Function to get the count based on filter status
 const getCount = () => {
  switch (filterStatus) {
    case "all":
      return tasks.length;
    case "completed":
      return tasks.filter((task) => task.completed).length;
    case "incomplete":
      return tasks.filter((task) => !task.completed).length;
    default:
      return tasks.length;
  }
};

  return (
    <>
      <h1 className="heading">Todo List App</h1>
      <Container>
        <div className="taskAddList">
          <div className="add">
            <button className="addButton">
              <Link to="/add">Add Task</Link>
            </button>
          </div>
          {/* Search Input */}
          <div className="serarch">
            <input
              type="text"
              placeholder="Search Your Task"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Filtering Options */}
        <div className="filteringOptions">
          {/* Filter Status */}
          <div className="filterStatus">
            <button onClick={() => setFilterStatus("all")}>All Tasks</button>
            <button onClick={() => setFilterStatus("completed")}>
              Completed
            </button>
            <button onClick={() => setFilterStatus("incomplete")}>
              Incomplete
            </button>
          </div>
          {/* Filter Priority */}
          <div className="filterPriority">
            <label htmlFor="priority">Filter Priority:</label>
            <select
              className="ms-2 ps-2 pe-2 priorityClass"
              name="priority"
              id="priorities"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="none">Select One</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="taskCount">
          <p>Total Tasks: {getCount()}</p>
        </div>
        <Table className="mt-5" striped bordered hover>
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.completed ? "Completed" : "Incomplete"}</td>
                <td>
                  <div className="allActions">
                    <div className="firstAction">
                      <abbr title="Edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </abbr>
                    </div>
                    {!task.completed && (
                      <abbr
                        title="Mark As Completed"
                        onClick={() => markAsCompleted(task.id)}
                      >
                        <i className="fa-solid fa-bookmark"></i>
                      </abbr>
                    )}
                    <abbr
                      title="Delete"
                      onClick={() => deleteTask(task.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </abbr>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TaskList;
