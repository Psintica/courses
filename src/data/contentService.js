import courses from './courses.json';

export const getCourses = () => {
  return courses;
};

export const getCourse = (id) => {
    return courses.find(c => c.id === id);
};
