import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseList from './components/CourseList';
import CoursePlayer from './components/CoursePlayer';
import Footer from './components/Footer';
import './styles/index.css';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  if (selectedCourse) {
    return (
      <div className="App">
        <CoursePlayer courseId={selectedCourse} onBack={() => setSelectedCourse(null)} />
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <CourseList onSelectCourse={setSelectedCourse} />
      <Footer />
    </div>
  );
}

export default App;
