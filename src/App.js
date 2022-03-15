import './App.css';
import CreateInstance from './components/createInstance';
import { Routes, Route } from "react-router-dom";
import SearchInstance from './components/searchInstance';

function App() {
  return (
   <div>
     <Routes>
        <Route path="/" element={<CreateInstance />} />
        <Route path="/searchinstance" element={<SearchInstance />} />
      </Routes>
   </div>
  );
}

export default App;
