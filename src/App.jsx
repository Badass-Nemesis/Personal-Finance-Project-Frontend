import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Transactions from './components/Transactions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Category from './components/Category'
import Home from './components/Home';
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
          <Route exact path='/Transactions' element={<Transactions />} />
          <Route exact path='/Logout' element={<Logout />} />
          <Route exact path='/Category' element={<Category />} />
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
