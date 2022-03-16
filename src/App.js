import './App.css';
import CreateInstance from './components/createInstance';
import { Routes, Route } from "react-router-dom";
import HeaderTab from './components/headerTab';
import SearchInstance from './components/searchInstance';


function App() {
  return (
   <div>
     <Routes>
        <Route path="/createinstance" element={<CreateInstance />} />
        {/* <Route path="/searchinstance" element={<SearchInstance />} /> */}
        <Route path="/" element={<HeaderTab />} />
      </Routes>
   </div>
  );
}

export default App;
