import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { getCourse } from '../data/contentService';

const CoursePlayer = ({ courseId, onBack }) => {
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    const data = getCourse(courseId);
    if (data) {
      setCourse(data);
      setActiveLesson(data.lessons[0] || null);
    }
  }, [courseId]);

  if (!course) return <div className="container">Loading...</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '320px',
        borderRight: '1px solid var(--glass-border)',
        padding: '2rem',
        background: 'var(--glass)',
        backdropFilter: 'blur(20px)'
      }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--primary-glow)', cursor: 'pointer', marginBottom: '2rem', fontSize: '1rem' }}>
          ← Back to Library
        </button>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{course.title}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {course.lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className="glass-card"
              style={{
                padding: '1rem',
                textAlign: 'left',
                background: activeLesson?.id === lesson.id ? 'var(--primary)' : 'transparent',
                border: activeLesson?.id === lesson.id ? '1px solid var(--primary-glow)' : '1px solid transparent',
                borderRadius: '12px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              {lesson.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '4rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {activeLesson ? (
            <article className="prose prose-invert">
              {activeLesson.video && (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '24px', marginBottom: '3rem', border: '1px solid var(--glass-border)' }}>
                  <iframe
                    src={activeLesson.video}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    allowFullScreen
                    title="Lesson Video"
                  />
                </div>
              )}
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{activeLesson.title}</h1>
              <div style={{ fontSize: '1.125rem', color: 'var(--text-main)' }}>
                <ReactMarkdown 
                  remarkPlugins={[remarkMath]} 
                  rehypePlugins={[rehypeKatex]}
                >
                  {activeLesson.content}
                </ReactMarkdown>
              </div>
            </article>
          ) : (
            <div>Select a lesson to start learning!</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CoursePlayer;
