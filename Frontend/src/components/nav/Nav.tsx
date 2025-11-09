import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>Pixell River Finincial</h2>
        </div>
        <div className="nav-links">
          <div className="links">
            <Link to="/employees">Employees</Link>
            <Link to="/organization">Organization</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;