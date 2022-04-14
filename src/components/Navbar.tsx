import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav>
        <Link to="/">main</Link>
        <Link to="/result">result</Link>
      </nav>
    </div>
  );
}

export default Navbar;
