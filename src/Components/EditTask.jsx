import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const foundTask = tasks.find((task) => task.id === taskId);
    if (foundTask) {
      setTask(foundTask);
      setTitle(foundTask.title);
      setDescription(foundTask.description);
      setPriority(foundTask.priority);
    }
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTask = { ...task, title, description, priority };
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? updatedTask : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log(updatedTask);
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Task</h2>
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
          <input className="mt-5" type="submit" value="Update Task" />
        </form>
      </Container>
    </div>
  );
};

export default EditTask;
