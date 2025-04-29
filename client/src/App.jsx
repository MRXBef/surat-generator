import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Payment from './components/Payment';
import Dashboard from './components/Dashboard';
import Laporan from './components/Laporan';
import EditSurat from './components/EditSurat';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Payment/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/laporan" element={<Laporan/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
