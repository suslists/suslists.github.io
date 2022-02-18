import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.scss';
import Home from './components/home'
import Login from './components/login'
import Dashboard from './components/dashboard'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/item/:itemId" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
