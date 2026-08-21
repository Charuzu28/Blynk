import React from "react"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from "./components/Footer";
import Settings from "./pages/Settings";
import Maintenance from "./pages/Maintenance";

const MAINTENANCE_MODE = true;

function App() {

  if (MAINTENANCE_MODE) {
    return <Maintenance />;
  }
  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/settings" element={<Settings/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
