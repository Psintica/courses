import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { getCourse } from '../data/contentService';

const CoursePlayer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    const data = getCourse(courseId);
    if (data) {
      setCourse(data);
      if (lessonId) {
        const found = data.lessons.find(l => l.id === lessonId);
        setActiveLesson(found || data.lessons[0]);
      } else {
        setActiveLesson(data.lessons[0] || null);
      }
    }
  }, [courseId, lessonId]);

  if (!course) return <div className="container">Loading Course...</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <Helmet>
        <title>{activeLesson ? `${activeLesson.title} | ${course.title} | Psintica` : `${course.title} | Psintica`}</title>
        <meta name="description" content={`Learn ${activeLesson?.title || course.title} on Psintica Courses.`} />
      </Helmet>

      {/* Sidebar */}
      <aside style={{
        width: '320px',
        borderRight: '1px solid var(--glass-border)',
        padding: '2rem',
        background: 'var(--glass)',
        backdropFilter: 'blur(20px)'
      }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--primary-glow)', cursor: 'pointer', marginBottom: '2rem', fontSize: '1rem' }}>
          ← Back to Library
        </button>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{course.title}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {course.lessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/course/${course.id}/lesson/${lesson.id}`}
              className="glass-card"
              style={{
                display: 'block',
                textDecoration: 'none',
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
            </Link>
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
                  remarkPlugins={[remarkMath, remarkGfm]} 
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    blockquote: ({ children }) => {
                      let isNote = false;
                      let isQuiz = false;
                      let questionNodes = [];
                      let answerNodes = [];

                      const contentArray = React.Children.toArray(children);
                      const firstPIndex = contentArray.findIndex(child => child && child.type === 'p' && child.props);
                      const firstChild = firstPIndex >= 0 ? contentArray[firstPIndex] : null;
                      
                      if (firstChild) {
                        const pChildren = React.Children.toArray(firstChild.props.children);
                        
                        // Extract all text to reliably detect the tag anywhere in the first paragraph
                        let fullText = '';
                        pChildren.forEach(child => {
                          if (typeof child === 'string') fullText += child;
                        });
                        
                        if (fullText.includes('[!NOTE]')) {
                          isNote = true;
                          let firstPAnswerNodes = [];
                          let foundNoteMarker = false;
                          pChildren.forEach((child) => {
                            if (!foundNoteMarker && typeof child === 'string' && child.includes('[!NOTE]')) {
                              foundNoteMarker = true;
                              let text = child.replace(/\[!NOTE\]\s*/, '').replace(/^\n/, '');
                              if (text) firstPAnswerNodes.push(text);
                            } else {
                              firstPAnswerNodes.push(child);
                            }
                          });
                          answerNodes = [
                            ...contentArray.slice(0, firstPIndex),
                            React.cloneElement(firstChild, { children: firstPAnswerNodes }),
                            ...contentArray.slice(firstPIndex + 1)
                          ];
                        } else if (fullText.includes('[!QUIZ]')) {
                          isQuiz = true;
                          let foundNewline = false;
                          let foundQuizMarker = false;
                          let firstPAnswerNodes = [];
                          
                          pChildren.forEach(child => {
                            if (foundNewline) {
                              firstPAnswerNodes.push(child);
                            } else if (typeof child === 'string') {
                              if (!foundQuizMarker && child.includes('[!QUIZ]')) {
                                foundQuizMarker = true;
                                if (child.includes('\n')) {
                                  const parts = child.split('\n');
                                  const qPart = parts[0].replace(/\[!QUIZ\]\s*/, '');
                                  if (qPart) questionNodes.push(qPart);
                                  
                                  foundNewline = true;
                                  const aPart = parts.slice(1).join('\n');
                                  if (aPart) firstPAnswerNodes.push(aPart);
                                } else {
                                  const qPart = child.replace(/\[!QUIZ\]\s*/, '');
                                  if (qPart) questionNodes.push(qPart);
                                }
                              } else if (foundQuizMarker) {
                                // If quiz marker already found, just treat this as normal question part until newline
                                if (child.includes('\n')) {
                                  const parts = child.split('\n');
                                  if (parts[0]) questionNodes.push(parts[0]);
                                  foundNewline = true;
                                  const aPart = parts.slice(1).join('\n');
                                  if (aPart) firstPAnswerNodes.push(aPart);
                                } else {
                                  questionNodes.push(child);
                                }
                              } else {
                                // Before quiz marker (e.g. leading whitespace)
                                questionNodes.push(child);
                              }
                            } else {
                              questionNodes.push(child);
                            }
                          });
                          
                          if (firstPAnswerNodes.length > 0) {
                            answerNodes.push(React.cloneElement(firstChild, { children: firstPAnswerNodes }));
                          }
                          answerNodes = [
                            ...contentArray.slice(0, firstPIndex),
                            ...answerNodes,
                            ...contentArray.slice(firstPIndex + 1)
                          ];
                        }
                      }

                      if (isNote) {
                        return (
                          <blockquote className="markdown-alert">
                            <p className="alert-title">Note</p>
                            {answerNodes}
                          </blockquote>
                        );
                      }

                      if (isQuiz) {
                        return (
                          <details className="quiz-block">
                            <summary>
                              <span>{questionNodes}</span>
                              <span className="reveal-badge">Reveal Answer</span>
                            </summary>
                            <div className="quiz-answer">
                              {answerNodes}
                            </div>
                          </details>
                        );
                      }

                      return <blockquote className="standard-quote">{children}</blockquote>;
                    }
                  }}
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
