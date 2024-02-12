
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TaskList from './Components/TaskList';
import AddTask from './Components/AddTask';
import SingleTask from './Components/SingleTask';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<TaskList />}/>
     <Route path="/add" element={<AddTask/>}/>
     <Route path="/task/:id" element={<SingleTask/>}/>
      </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
