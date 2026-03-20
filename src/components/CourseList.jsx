import { Link } from 'react-router-dom';
import { getCourses } from '../data/contentService';
import CourseCard from './CourseCard';

const CourseList = () => {
  const courses = getCourses();

  return (
    <section id="courses" style={{ padding: '6rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
          Explore Our <span style={{ color: 'var(--secondary)' }}>Top Courses</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {courses.map(course => (
            <Link key={course.id} to={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
              <CourseCard course={course} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseList;
