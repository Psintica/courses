import React, { useEffect, useState } from 'react';

const HeroVisual = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 50;
      const moveY = (clientY - window.innerHeight / 2) / 50;
      setMousePos({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hero-visual-container">
      {/* Moving Mesh Grid */}
      <div className="mesh-grid"></div>
      
      {/* Floating Glowing Orbs */}
      <div className="glow-orb" style={{
        width: '300px',
        height: '300px',
        background: 'var(--primary)',
        top: '20%',
        left: '20%',
        transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
      }}></div>
      
      <div className="glow-orb" style={{
        width: '250px',
        height: '250px',
        background: 'var(--secondary)',
        bottom: '20%',
        right: '25%',
        animationDelay: '-5s',
        transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`
      }}></div>

      <div className="glow-orb" style={{
        width: '200px',
        height: '200px',
        background: 'var(--primary-glow)',
        top: '40%',
        right: '15%',
        animationDelay: '-10s',
        transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`
      }}></div>

      {/* Central Interactive Element */}
      <div style={{
        zIndex: 1,
        padding: '2rem',
        background: 'var(--glass)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--glass-border)',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`
      }}>
        <div style={{ 
            fontSize: '5rem', 
            fontWeight: 800, 
            background: 'linear-gradient(135deg, #fff, var(--primary-glow))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-2px'
        }}>
          PSINTICA
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
