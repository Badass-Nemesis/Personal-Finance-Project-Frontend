import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Transactions from './components/Transactions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Categoryfifteen from './components/Categoryfifteen'
import Categorythirty from './components/Categorythirty'
import Categorysixty from './components/Categorysixty'
import Home from './components/Home';
// import dotenv from 'dotenv';
// dotenv.config();
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/register'

function App() {
  return (

    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/Transactions' element={<Transactions />} />
          <Route path='/Logout' element={<Logout />} />
          <Route path='/Categoryfifteen' element={<Categoryfifteen />} />
          <Route path='/Categorythirty' element={<Categorythirty />} />
          <Route path='/Categorysixty' element={<Categorysixty />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
