import './App.css';
import Admin from './pages/Admin';
import Member from './pages/Member';
import { Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<Member />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes >
    </>
  )
}

export default App
