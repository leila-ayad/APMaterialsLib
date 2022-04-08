import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import MaterialForm from './components/MaterialForm';
import Logout from './components/Logout';
import Materials from './components/Materials';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route 
          path="/"
          element={<Login/>}
        />
        <Route 
          path="/materials"
          element={<Materials/>}
        />
        <Route
          path="/createNewMaterial"
          element={<MaterialForm/>}
        />
      </Routes>
    </div>
  );
}

export default App;
