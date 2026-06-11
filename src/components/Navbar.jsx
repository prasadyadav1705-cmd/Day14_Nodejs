import { NavLink } from 'react-router-dom';

const navStyle = {
  display: 'flex', gap: '20px', padding: '15px 30px',
  backgroundColor: '#1a1a2e', alignItems: 'center'
};

const linkStyle = {
  color: '#a8b2d8', textDecoration: 'none',
  fontWeight: 'bold', fontSize: '16px'
};

const activeStyle = {
  color: '#64ffda', borderBottom: '2px solid #64ffda',
  paddingBottom: '3px'
};

function Navbar() {
  return (
    <nav style={navStyle}>
      <span style={{ color: '#64ffda', fontSize: '20px', fontWeight: 'bold', marginRight: 'auto' }}>
        StudentPortal
      </span>
      <NavLink to="/" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        Home
      </NavLink>
      <NavLink to="/about" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        About
      </NavLink>
      <NavLink to="/contact" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        Contact
      </NavLink>
    </nav>
  );
}

export default Navbar;