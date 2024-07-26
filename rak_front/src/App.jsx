import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UserManager from './components/UserManager';
import ClubManager from './components/ClubManager';
import ReportManager from './components/ReportManager';


function App() {

  return (

    <div className='App'>
      <Header />
      <div className='main-container'>
        <Sidebar />
        <div className='content'>
          <Routes>
            {/* 렌더링할 페이지  */}
            <Route path='/' element={<Dashboard />} />
            <Route path='/user' element={<UserManager />} />
            <Route path='/club' element={<ClubManager />} />
            <Route path='/report' element={<ReportManager />} />
          </Routes>
        </div>
      </div>
    </div>

  )
}

export default App
