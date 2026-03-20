const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const dataFile = path.join(__dirname, '..', 'src', 'data', 'courses.json');
const htmlTemplate = path.join(distDir, 'index.html');

if (!fs.existsSync(dataFile) || !fs.existsSync(htmlTemplate)) {
  console.error('Data file or index.html not found, skipping SEO page generation.');
  process.exit(0);
}

const coursesData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
const indexHtmlContent = fs.readFileSync(htmlTemplate, 'utf-8');

function createPage(routePath) {
  const dirPath = path.join(distDir, routePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'index.html'), indexHtmlContent);
  console.log(`Generated static route: /${routePath}`);
}

// Generate static entry points for each course and lesson
coursesData.forEach(course => {
  // Course overview page
  createPage(`course/${course.id}`);
  
  // Individual lesson pages
  if (course.lessons && Array.isArray(course.lessons)) {
    course.lessons.forEach(lesson => {
      createPage(`course/${course.id}/lesson/${lesson.id}`);
    });
  }
});

console.log('SEO pages generation complete!');
