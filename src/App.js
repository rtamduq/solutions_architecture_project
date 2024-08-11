import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/header';
import Books from './components/Books'; 
import sampleImage from './assets/images/humber.png';
import './assets/styles/App.css'; 
import userpool from './userpool';

function App() {

  useEffect(()=>{
    let user=userpool.getCurrentUser();
      if(user){
        <Navigate to="/dashboard" replace />
      }
  },[]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="main-content">
          <img src={sampleImage} alt="Sample" className="main-image" />
        </div>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
          <Route path="/dashboard" element={<Books/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;