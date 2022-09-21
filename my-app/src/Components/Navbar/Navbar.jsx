import "./Navbar.css";
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div>
            <nav className="navbar-home">
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/">
                <span>Home</span>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/search">
                <span>Search</span>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/blog">
                <span>Blog</span>
            </NavLink>
            </nav>
        </div>
    )
}