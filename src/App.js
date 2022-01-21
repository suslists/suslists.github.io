import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Home from './components/home'
import Login from './components/login'
import Dashboard from './components/dashboard'

function App() {
  return (
    <>
    <h1 className="text-3xl font-black underline">
      Hello world!
    </h1>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
