import './App.css';
//import Datafetching from './components/Datafetching';
import Transactions from './components/Transactions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
// // import Addnewtransaction from './components/Addnewtransaction';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <BrowserRouter>
        <Routes>
          <Route path="./components/Transactions.js" element={<Transactions />}>
          </Route>
        </Routes>
      </BrowserRouter> */}
      <Transactions/>
    </div>
  );
}

export default App;
