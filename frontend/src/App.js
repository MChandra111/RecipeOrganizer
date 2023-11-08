import './App.css';
import Logobar from "./components/Logobar";
import Searchbar from './components/Searchbar';
import DataDisplay from './components/DataDisplay';

function App() {
  return (
    <div className="App">
        <Logobar />
        <Searchbar />
      <div className='allSquares'>
        <DataDisplay />
      </div>
    </div>
  );
}

export default App;
