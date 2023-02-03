import './App.css';
//import Datafetching from './components/Datafetching';
import Transactions from './components/Transactions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
// import Addnewtransaction from './components/Addnewtransaction';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Transactions/>
    </div>
  );
}

export default App;
