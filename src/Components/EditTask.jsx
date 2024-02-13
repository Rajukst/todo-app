import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("none");

  useEffect(() => {
    // Fetch task data based on taskId
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = existingTasks.find((task) => task.id === Number(taskId));

    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
    }
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update task data
    const updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTaskIndex = updatedTasks.findIndex(
      (task) => task.id === Number(taskId)
    );
    if (updatedTaskIndex !== -1) {
      updatedTasks[updatedTaskIndex] = {
        id: Number(taskId),
        title,
        description,
        priority,
        completed: false,
      };

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    // Navigate back to the home page
    navigate("/");
  };

  return (
    <div>
      <h2 className="heading">Edit Task</h2>
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
          <input className="mt-5 addButton" type="submit" value="Update Task" />
        </form>
      </Container>
    </div>
  );
};

export default EditTask;
