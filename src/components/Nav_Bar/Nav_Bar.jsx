import "./navbar.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav id="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="About">About</NavLink>
      <NavLink to="Works">Works</NavLink>
      <NavLink to="Contact">Contact</NavLink>
    </nav>
  );
}
