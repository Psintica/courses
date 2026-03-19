import React from 'react';
import { getAssetPath } from '../utils/assetManager';
import HeroVisual from './HeroVisual';

const Hero = () => {
  return (
    <section style={{ padding: '6rem 0', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          Elevate Your <span style={{ color: 'var(--primary-glow)' }}>Research Journey</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Premium courses designed to help you master the most advanced topics in data science, robotics, and beyond.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="#courses" className="btn btn-primary">Explore Courses</a>
        </div>
        
        <div style={{ marginTop: '4rem' }}>
            <HeroVisual />
        </div>
      </div>
    </section>
  );
};

export default Hero;
