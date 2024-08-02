import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import GroupPage from "./pages/GroupPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/group" element={<GroupPage />} />
      </Routes>
    </>
  );
}
export default App;
