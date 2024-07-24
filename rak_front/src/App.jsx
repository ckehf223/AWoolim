import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

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
          </Routes>
        </div>
      </div>
    </div>

  )
}

export default App
