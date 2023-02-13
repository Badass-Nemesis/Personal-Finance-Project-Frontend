import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Transactions from './components/Transactions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Categoryfifteen from './components/Categoryfifteen'
import Categorythirty from './components/Categorythirty'
import Categorysixty from './components/Categorysixty'

function App() {

  return (

    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/Transactions' element={<Transactions />} />
          <Route path='/Categoryfifteen' element={<Categoryfifteen />} />
          <Route path='/Categorythirty' element={<Categorythirty />} />
          <Route path='/Categorysixty' element={<Categorysixty />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
