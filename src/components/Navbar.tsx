import logo from "../assets/logo.png";
import "../styles/Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar-continer">
      <img src={logo} width="250px" className="logo" />
    </div>
  );
};

export default Navbar;
