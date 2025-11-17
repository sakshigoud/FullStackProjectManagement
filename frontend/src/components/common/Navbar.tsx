import { Link, NavLink } from 'react-router-dom';
import '../../styles.css';

const Navbar = () => {
  return (
    <header className="navbar-wrapper">
      <div className="navbar-inner">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-white font-semibold text-lg">
            Flipr
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#services" className="nav-link">
              Services
            </a>
            <a href="#projects" className="nav-link">
              Projects
            </a>
            <a href="#testimonials" className="nav-link">
              Testimonials
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>
        </div>
        <div className="newsletter-bar">
          <span className="hidden md:inline text-sm font-medium">Subscribe Us</span>
          <Link to="/login" className="hidden md:inline text-sm underline">
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
