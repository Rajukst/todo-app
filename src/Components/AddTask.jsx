import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("none");
const navigate= useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || priority === "none") {
      alert("Please fill all fields and select a priority");
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
    };

    // Save the new task to local storage
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([...existingTasks, newTask]));

    // Clear form fields
    setTitle("");
    setDescription("");
    setPriority("none");
    navigate("/")
  };

  return (
    <>
      <h1 className="addTaskHeader">Add Task</h1>
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="addTitle">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="taskDesc">
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="4"
            ></textarea>
          </div>
          <div className="filterPriority">
            <label htmlFor="priority">Set Priority:</label>
            <select
              className="ms-2 ps-2 pe-2 priorityClass"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="none">Select One</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <input className="mt-5" type="submit" value="Add Task" />
        </form>
      </Container>
    </>
  );
};

export default AddTask;
