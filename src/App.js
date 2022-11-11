import Homepage from "./Components/Home/Homepage";
import Detailpage from "./Components/HotelDetail/Detailpage";
import "./Css/main.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Details" element={<Detailpage />} />
      </Routes>
    </div>
  );
}

export default App;
