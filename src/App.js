// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Asegúrate de que esta ruta sea correcta
import Login from './components/Login';
import Header from './components/header'; // Asegúrate de que el nombre del archivo sea correcto
import Books from './components/Books'; // Asegúrate de crear este componente
import './assets/styles/App.css'; // Asegúrate de que el archivo CSS esté correctamente vinculado
import sampleImage from './assets/images/humber.png'; // Importa tu imagen aquí

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="main-content">
            <img src={sampleImage} alt="Sample" className="main-image" />
          </div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/books" element={<Books />} />
            {/* Puedes agregar más rutas aquí */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
