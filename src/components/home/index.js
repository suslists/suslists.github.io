import { BrowserRouter as Router, Link } from "react-router-dom";
import './index.css';

function Home() {
  return (
    <>
      Home<br/>
      <Link to="/login">login</Link>
    </>
  );
}

export default Home;
