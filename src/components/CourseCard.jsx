import React from 'react';
import { getAssetPath } from '../utils/assetManager';

const CourseCard = ({ course }) => {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ borderRadius: '16px', overflow: 'hidden', height: '200px' }}>
        <img src={getAssetPath(course.image)} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <h3 style={{ fontSize: '1.5rem' }}>{course.title}</h3>
      <p style={{ color: 'var(--text-muted)' }}>{course.description}</p>
      <a href={course.link} className="btn" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'white', textAlign: 'center', marginTop: 'auto' }}>
        Learn More
      </a>
    </div>
  );
};

export default CourseCard;
