import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseList from './components/CourseList';
import CoursePlayer from './components/CoursePlayer';
import Footer from './components/Footer';
import './styles/index.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <CourseList />
          </>
        } />
        <Route path="/course/:courseId" element={<CoursePlayer />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<CoursePlayer />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
