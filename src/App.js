import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';


function App() {
  return (
    <BrowserRouter>
    <Routes  />
     {/* <Routes>
        <Route path="/createinstance" element={<CreateInstance />} />
        <Route path="/searchinstance" element={<SearchInstance />} />
        <Route path="/" element={<HeaderTab />} />
        <Route path="/" element={<TrialF />} />
      </Routes>  */}
    </BrowserRouter>
  );
}

export default App;
