import React from 'react';

const Navbar = () => {
  return (
    <nav style={{
      padding: '1.5rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 10, 12, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '1.25rem', fontWeight: 700, textDecoration: 'none', color: 'white' }}>Psintica Courses</a>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="/" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Home</a>
          <a href="#courses" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Courses</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
